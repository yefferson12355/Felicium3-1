// --- 1. CONEXIONES (Importaciones) ---

// a) Importamos la Entidad del Dominio (el "Ingrediente" que manejamos)
import { Paciente } from '../../../core/domain/patient/patient.entity';
// b) Importamos el Contrato que debemos cumplir
import { IPatientRepository } from '../../../core/application/patient/interfaces/IPatientRepository';
// c) Importamos la conexión física a la base de datos
import { pgClient } from '../../config/database.config'; 
// d) Importamos crypto nativo para generar IDs únicos
import { randomUUID } from 'crypto';
// e) Importamos la Fábrica para reconstruir objetos
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
    // Devuelve la entidad ACTUALIZADA con el ID (para nuevos registros)
    public async guardar(paciente: Paciente): Promise<Paciente> {
        
        const isNew = paciente.id === null;

        if (isNew) {
            // Lógica para INSERT (Crear)
            // Generar UUID para el nuevo paciente usando crypto nativo
            const nuevoId = randomUUID();

            const query = `
                INSERT INTO patients (id, nombre, apellido, dni, email, esta_activo, fecha_creacion, firma_digital, odontograma, fecha_nacimiento, telefono, direccion, nombre_apoderado, observaciones)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                RETURNING id;
            `;
            const values = [
                nuevoId,  // ✅ Incluir el UUID generado
                paciente.nombre, paciente.apellido, paciente.dni, paciente.email, paciente.estaActivo, paciente.fechaCreacion, 
                paciente.firmaDigital, paciente.odontograma, paciente.fechaNacimiento, paciente.telefono, paciente.direccion, paciente.nombreApoderado, paciente.observaciones
            ];

            const result = await pgClient.query(query, values);
            
            // ✅ Reconstruir la entidad con el ID asignado
            if (result.rows.length > 0 && result.rows[0].id) {
              const idAsignado = result.rows[0].id;
              // Usar crearExistente para construir la entidad CON el ID
              return Paciente.crearExistente({
                id: idAsignado,
                nombre: paciente.nombre,
                apellido: paciente.apellido,
                email: paciente.email,
                dni: paciente.dni,
                telefono: paciente.telefono,
                fechaNacimiento: paciente.fechaNacimiento,
                firmaDigital: paciente.firmaDigital,
                odontograma: paciente.odontograma,
                nombreApoderado: paciente.nombreApoderado,
                direccion: paciente.direccion,
                estaActivo: paciente.estaActivo,
                observaciones: paciente.observaciones,
                fechaCreacion: paciente.fechaCreacion
              });
            }
            throw new Error('No se pudo obtener el ID del nuevo paciente');

        } else {
            // Lógica para UPDATE (Actualizar)
            const query = `
                UPDATE patients 
                SET nombre = $1, 
                    apellido = $2, 
                    email = $3, 
                    telefono = $4,
                    direccion = $5,
                    nombre_apoderado = $6,
                    fecha_nacimiento = $7,
                    firma_digital = $8,
                    odontograma = $9,
                    observaciones = $10,
                    esta_activo = $11,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $12;
            `;
            await pgClient.query(query, [
                paciente.nombre, 
                paciente.apellido, 
                paciente.email, 
                paciente.telefono,
                paciente.direccion,
                paciente.nombreApoderado,
                paciente.fechaNacimiento,
                paciente.firmaDigital,
                paciente.odontograma,
                paciente.observaciones,
                paciente.estaActivo,
                paciente.id
            ]);
            
            // Devolver la entidad actualizada
            return paciente;
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
        // ✅ CORREGIDO: Implementación completa
        const query = `SELECT * FROM patients WHERE dni = $1;`;
        const result = await pgClient.query(query, [dni]);

        if (result.rowCount === 0) {
            return null; // Paciente no encontrado
        }

        const row = result.rows[0];

        return Paciente.crearExistente({
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            email: row.email,
            dni: row.dni,
            telefono: row.telefono,
            fechaNacimiento: row.fecha_nacimiento,
            firmaDigital: row.firma_digital,  // ✅ MAPEAR FIRMA
            odontograma: row.odontograma,
            nombreApoderado: row.nombre_apoderado,
            direccion: row.direccion,
            estaActivo: row.esta_activo,
            observaciones: row.observaciones,
            fechaCreacion: row.fecha_creacion
        });
    }

    // --- 5. IMPLEMENTACIÓN: obtenerTodos() ---
    public async obtenerTodos(): Promise<Paciente[]> {
        // ✅ CORREGIDO: Implementación completa
        const query = `SELECT * FROM patients WHERE esta_activo = true ORDER BY fecha_creacion DESC;`;
        const result = await pgClient.query(query);

        return result.rows.map(row => 
            Paciente.crearExistente({
                id: row.id,
                nombre: row.nombre,
                apellido: row.apellido,
                email: row.email,
                dni: row.dni,
                telefono: row.telefono,
                fechaNacimiento: row.fecha_nacimiento,
                firmaDigital: row.firma_digital,  // ✅ MAPEAR FIRMA
                odontograma: row.odontograma,
                nombreApoderado: row.nombre_apoderado,
                direccion: row.direccion,
                estaActivo: row.esta_activo,
                observaciones: row.observaciones,
                fechaCreacion: row.fecha_creacion
            })
        );
    }
}