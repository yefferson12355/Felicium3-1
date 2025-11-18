// --- 1. CONEXIONES (Importaciones) ---

// a) Importamos la Entidad del Dominio (el "Ingrediente" que manejamos)
import { Paciente } from '../../../core/domain/patient/patient.entity';
// b) Importamos el Contrato que debemos cumplir
import { IPatientRepository } from '../../../core/application/patient/interfaces/IPatientRepository';
// c) Importamos la conexión física a la base de datos
import { pgClient } from '../../config/database.config'; 
// d) Importamos la Fábrica para reconstruir objetos
// Asumimos que esta clase maneja la reconstrucción de Paciente
// ya que es la única que tiene el constructor privado
// import { PacienteFactory } from '../../../core/domain/patient/patient.factory'; 
// USAMOS LOS MÉTODOS STATIC DE PACIENTE (crearExistente) directo:

/**
 * @class PatientRepository
 * @description Implementación concreta del contrato IPatientRepository
 * usando el driver de PostgreSQL.
 */
export class PatientRepository implements IPatientRepository {
    
    // --- 2. IMPLEMENTACIÓN: guardar(paciente) ---
    // Este método maneja tanto la creación como la actualización.
    // NOTA: En un sistema real, esta función sería ASÍNCRONA y usaría una TRANSACCIÓN
    // para guardar toda la información del Agregado (Historia, Registros) a la vez.
    public async guardar(paciente: Paciente): Promise<void> {
        
        const isNew = paciente.id === null;

        if (isNew) {
            // Lógica para INSERT (Crear)
            // En un ORM, esto se maneja automáticamente.
            // Para SQL puro:

            const query = `
                INSERT INTO patients (nombre, apellido, dni, email, esta_activo, fecha_creacion, firma_digital, odontograma, fecha_nacimiento, telefono, direccion, nombre_apoderado, observaciones)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING id;
            `;
            const values = [
                paciente.nombre, paciente.apellido, paciente.dni, paciente.email, paciente.estaActivo, paciente.fechaCreacion, 
                paciente.firmaDigital, paciente.odontograma, paciente.fechaNacimiento, paciente.telefono, paciente.direccion, paciente.nombreApoderado, paciente.observaciones
            ];

            const result = await pgClient.query(query, values);
            
            // Aquí, en el mundo real, guardaríamos HistoriaClinica, TreatmentRecord, etc.
            // Y luego asignaríamos el ID generado por la BD a la entidad: paciente.id = result.rows[0].id;

        } else {
            // Lógica para UPDATE (Actualizar)
            // Solo actualiza los campos permitidos y el estado 'esta_activo'.
            const query = `
                UPDATE patients 
                SET nombre = $1, apellido = $2, email = $3, esta_activo = $4 
                WHERE id = $5;
            `;
            await pgClient.query(query, [paciente.nombre, paciente.apellido, paciente.email, paciente.estaActivo, paciente.id]);
        }
    }

    // --- 3. IMPLEMENTACIÓN: buscarPorId(id) ---
    // Traduce la fila de la DB de vuelta a una Entidad de Dominio.
    public async buscarPorId(id: number): Promise<Paciente | null> {
        // En un sistema real, esta query juntaría al Paciente, Historia y Registros.
        const query = `SELECT * FROM patients WHERE id = $1;`;
        const result = await pgClient.query(query, [id]);

        if (result.rowCount === 0) {
            return null; // Paciente no encontrado
        }

        const row = result.rows[0];

        // Usamos la Fábrica 'crearExistente' de la entidad para reconstruir el objeto.
        // Esto es crucial: el repositorio NO hace 'new Paciente()', usa el método estático.
        return Paciente.crearExistente({
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            email: row.email,
            dni: row.dni,
            // ... (mapear el resto de las 15 propiedades) ...
            telefono: row.telefono,
            fechaNacimiento: row.fecha_nacimiento, // Nombres de la DB vs Nombres del Código
            firmaDigital: row.firma_digital,
            odontograma: row.odontograma,
            nombreApoderado: row.nombre_apoderado,
            direccion: row.direccion,
            estaActivo: row.esta_activo,
            observaciones: row.observaciones,
            fechaCreacion: row.fecha_creacion
        });
    }

    // --- 4. IMPLEMENTACIÓN: buscarPorDni(dni) ---
    public async buscarPorDni(dni: string): Promise<Paciente | null> {
        // Lógica similar a buscarPorId... (se busca la fila y se usa crearExistente)
        return null; // Placeholder para simplificar
    }

    // --- 5. IMPLEMENTACIÓN: obtenerTodos() ---
    public async obtenerTodos(): Promise<Paciente[]> {
        // Lógica para obtener todas las filas y mapearlas con crearExistente
        return []; // Placeholder para simplificar
    }
}