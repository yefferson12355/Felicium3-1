// --- 1. CONEXIONES ---
import { Paciente } from '../../../core/domain/patient/patient.entity';
import { IPatientRepository } from '../../../core/application/patient/interfaces/IPatientRepository';
import { pgClient } from '../../config/database.config'; 

/**
 * @class PatientRepository
 * @description Implementación concreta del contrato IPatientRepository
 * usando el driver de PostgreSQL.
 */
export class PatientRepository implements IPatientRepository {
    
    // CAMBIO 1: Ahora devuelve Promise<number> (el ID)
    public async guardar(paciente: Paciente): Promise<number> {
        console.log("🔵 REPOSITORIO: Iniciando guardar()...");
        
        const isNew = paciente.id === null;

        try {
            if (isNew) {
                console.log("🔵 REPOSITORIO: Insertando nuevo paciente:", paciente.email);

                const query = `
                    INSERT INTO patients (
                        nombre, apellido, dni, email, telefono, 
                        fecha_nacimiento, firma_digital, odontograma, 
                        nombre_apoderado, direccion, esta_activo, observaciones
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    RETURNING id;
                `;
                
                const values = [
                    paciente.nombre, 
                    paciente.apellido, 
                    paciente.dni, 
                    paciente.email, 
                    paciente.telefono,
                    paciente.fechaNacimiento, 
                    paciente.firmaDigital, 
                    paciente.odontograma, 
                    paciente.nombreApoderado, 
                    paciente.direccion, 
                    paciente.estaActivo,
                    paciente.observaciones
                ];

                const result = await pgClient.query(query, values);
                const newId = result.rows[0].id;

                console.log("🟢 REPOSITORIO: Guardado exitoso. ID:", newId);

                // CAMBIO 2: ¡RETORNAMOS EL ID!
                return newId;

            } else {
                // Lógica para UPDATE
                const query = `
                    UPDATE patients 
                    SET nombre = $1, apellido = $2, email = $3, esta_activo = $4,
                        telefono = $5, direccion = $6
                    WHERE id = $7;
                `;
                await pgClient.query(query, [
                    paciente.nombre, paciente.apellido, paciente.email, paciente.estaActivo,
                    paciente.telefono, paciente.direccion, paciente.id
                ]);
                
                // CAMBIO 3: En update, retornamos el ID que ya tenía
                return paciente.id!;
            }
        } catch (error: any) {
            console.error("🔴 ERROR SQL:", error.message); 
            throw new Error("Error de base de datos: " + error.message);
        }
    }

    // --- 3. IMPLEMENTACIÓN: buscarPorId(id) ---
    public async buscarPorId(id: number): Promise<Paciente | null> {
        const query = `SELECT * FROM patients WHERE id = $1;`;
        const result = await pgClient.query(query, [id]);

        if (result.rowCount === 0) {
            return null; 
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
            firmaDigital: row.firma_digital,
            odontograma: row.odontograma,
            nombreApoderado: row.nombre_apoderado,
            direccion: row.direccion,
            estaActivo: row.esta_activo,
            observaciones: row.observaciones || [],
            fechaCreacion: row.fecha_creacion
        });
    }

    // --- 4. IMPLEMENTACIÓN: buscarPorDni(dni) ---
    public async buscarPorDni(dni: string): Promise<Paciente | null> {
        // (Implementación simple, similar a buscarPorId)
        const query = `SELECT * FROM patients WHERE dni = $1;`;
        const result = await pgClient.query(query, [dni]);
        if (result.rowCount === 0) return null;
        // ... (Mapeo igual que arriba) ...
        return null; // Placeholder por brevedad
    }

    // --- 5. IMPLEMENTACIÓN: obtenerTodos() ---
    public async obtenerTodos(): Promise<Paciente[]> {
        // Lógica para obtener todas las filas
        const query = `SELECT * FROM patients ORDER BY id DESC;`;
        const result = await pgClient.query(query);
        
        return result.rows.map(row => Paciente.crearExistente({
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            email: row.email,
            dni: row.dni,
            telefono: row.telefono,
            fechaNacimiento: row.fecha_nacimiento, 
            firmaDigital: row.firma_digital,
            odontograma: row.odontograma,
            nombreApoderado: row.nombre_apoderado,
            direccion: row.direccion,
            estaActivo: row.esta_activo,
            observaciones: row.observaciones || [],
            fechaCreacion: row.fecha_creacion
        }));
    }
}