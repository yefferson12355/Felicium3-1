// --- 1. CONEXIONES (Importaciones) ---

// a) Importamos la Entidad del Dominio (el "Ingrediente" que manejamos)
import { Paciente } from '../../../core/domain/patient/patient.entity';
// b) Importamos el Contrato que debemos cumplir
import { IPatientRepository } from '../../../core/application/patient/interfaces/IPatientRepository';
// c) Importamos la conexión física a la base de datos
import { pgClient } from '../../config/database.config'; 
// d) Importamos crypto nativo para generar IDs únicos
import { randomUUID } from 'crypto';
// e) Importamos el Mapper de DB para conversiones consistentes
import { PatientDbMapper, PatientRow } from '../mappers/PatientDbMapper';

/**
 * @class PatientRepository
 * @description Implementación concreta del contrato IPatientRepository
 * usando el driver de PostgreSQL.
 * 
 * ✅ Usa PatientDbMapper para todas las conversiones DB ↔ Entity
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
                RETURNING *;
            `;
            
            // ✅ Usar mapper centralizado para los valores
            const values = PatientDbMapper.toInsertValues(paciente, nuevoId);
            const result = await pgClient.query(query, values);
            
            // ✅ Usar mapper para reconstruir la entidad desde la fila retornada
            if (result.rows.length > 0) {
                return PatientDbMapper.toDomain(result.rows[0] as PatientRow);
            }
            throw new Error('No se pudo obtener el paciente insertado');

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
                WHERE id = $12
                RETURNING *;
            `;
            
            // ✅ Usar mapper centralizado para los valores
            const values = PatientDbMapper.toUpdateValues(paciente);
            const result = await pgClient.query(query, values);
            
            // ✅ Usar mapper para reconstruir la entidad desde la fila retornada
            if (result.rows.length > 0) {
                return PatientDbMapper.toDomain(result.rows[0] as PatientRow);
            }
            
            // Si no se actualizó nada, devolver la entidad original
            return paciente;
        }
    }

    // --- 3. IMPLEMENTACIÓN: buscarPorId(id) ---
    // Traduce la fila de la DB de vuelta a una Entidad de Dominio.
    public async buscarPorId(id: string): Promise<Paciente | null> {
        const query = `SELECT * FROM patients WHERE id = $1;`;
        const result = await pgClient.query(query, [id]);

        if (result.rowCount === 0) {
            return null; // Paciente no encontrado
        }

        // ✅ Usar el mapper centralizado
        return PatientDbMapper.toDomain(result.rows[0] as PatientRow);
    }

    // --- 4. IMPLEMENTACIÓN: buscarPorDni(dni) ---
    public async buscarPorDni(dni: string): Promise<Paciente | null> {
        const query = `SELECT * FROM patients WHERE dni = $1;`;
        const result = await pgClient.query(query, [dni]);

        if (result.rowCount === 0) {
            return null; // Paciente no encontrado
        }

        // ✅ Usar el mapper centralizado
        return PatientDbMapper.toDomain(result.rows[0] as PatientRow);
    }

    // --- 5. IMPLEMENTACIÓN: obtenerTodos() ---
    public async obtenerTodos(): Promise<Paciente[]> {
        const query = `SELECT * FROM patients WHERE esta_activo = true ORDER BY fecha_creacion DESC;`;
        const result = await pgClient.query(query);

        // ✅ Usar el mapper centralizado para listas
        return PatientDbMapper.toDomainList(result.rows as PatientRow[]);
    }
}