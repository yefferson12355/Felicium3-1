"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdontogramRepository = void 0;
const odontogram_entity_1 = require("../../../core/domain/odontogram/odontogram.entity");
const database_config_1 = require("../../config/database.config");
/**
 * OdontogramRepository
 *
 * Implementación del repositorio para odontogramas usando PostgreSQL
 *
 * Responsabilidades:
 * - Guardar/leer/actualizar odontogramas en BD
 * - Convertir entre entidades de dominio y formato de BD (JSON)
 * - Ejecutar queries SQL
 *
 * Nota: Los odontogramas se guardan como JSON en la columna "data"
 * para máxima flexibilidad con la estructura de dientes
 */
class OdontogramRepository {
    constructor() {
        // Usar el cliente singleton de database.config
        this.client = database_config_1.pgClient;
    }
    /**
     * Guarda un nuevo odontograma en la BD
     */
    async save(odontogram) {
        const query = `
      INSERT INTO odontograms (id, patient_id, data, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const values = [
            odontogram.getId(),
            odontogram.getPatientId(),
            JSON.stringify(odontogram.toJSON()),
            new Date(),
            new Date(),
        ];
        try {
            const result = await this.client.query(query, values);
            if (result.rows.length === 0) {
                throw new Error('No se pudo guardar el odontograma');
            }
            return this.mapRowToOdontogram(result.rows[0]);
        }
        catch (error) {
            throw new Error(`Error al guardar odontograma: ${error.message}`);
        }
    }
    /**
     * Obtiene un odontograma por su ID
     */
    async findById(id) {
        const query = `
      SELECT * FROM odontograms WHERE id = $1;
    `;
        try {
            const result = await this.client.query(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return this.mapRowToOdontogram(result.rows[0]);
        }
        catch (error) {
            throw new Error(`Error al obtener odontograma: ${error.message}`);
        }
    }
    /**
     * Obtiene el odontograma de un paciente específico
     */
    async findByPatientId(patientId) {
        const query = `
      SELECT * FROM odontograms WHERE patient_id = $1 LIMIT 1;
    `;
        try {
            const result = await this.client.query(query, [patientId]);
            if (result.rows.length === 0) {
                return null;
            }
            return this.mapRowToOdontogram(result.rows[0]);
        }
        catch (error) {
            throw new Error(`Error al obtener odontograma del paciente: ${error.message}`);
        }
    }
    /**
     * Obtiene todos los odontogramas
     * ⚠️ Usar con cuidado en BD grandes (implementar paginación en producción)
     */
    async findAll() {
        const query = `
      SELECT * FROM odontograms ORDER BY created_at DESC;
    `;
        try {
            const result = await this.client.query(query);
            return result.rows.map((row) => this.mapRowToOdontogram(row));
        }
        catch (error) {
            throw new Error(`Error al obtener odontogramas: ${error.message}`);
        }
    }
    /**
     * Actualiza un odontograma existente
     */
    async update(id, odontogram) {
        const query = `
      UPDATE odontograms
      SET data = $1, updated_at = $2
      WHERE id = $3
      RETURNING *;
    `;
        const values = [
            JSON.stringify(odontogram.toJSON()),
            new Date(),
            id,
        ];
        try {
            const result = await this.client.query(query, values);
            if (result.rows.length === 0) {
                return null;
            }
            return this.mapRowToOdontogram(result.rows[0]);
        }
        catch (error) {
            throw new Error(`Error al actualizar odontograma: ${error.message}`);
        }
    }
    /**
     * Elimina un odontograma
     */
    async delete(id) {
        const query = `
      DELETE FROM odontograms WHERE id = $1;
    `;
        try {
            const result = await this.client.query(query, [id]);
            // rowCount indica cuántas filas fueron afectadas
            return (result.rowCount || 0) > 0;
        }
        catch (error) {
            throw new Error(`Error al eliminar odontograma: ${error.message}`);
        }
    }
    /**
     * Verifica si existe un odontograma para un paciente
     */
    async existsByPatientId(patientId) {
        const query = `
      SELECT EXISTS(SELECT 1 FROM odontograms WHERE patient_id = $1);
    `;
        try {
            const result = await this.client.query(query, [patientId]);
            // En PostgreSQL, EXISTS devuelve un booleano
            return result.rows[0]?.exists || false;
        }
        catch (error) {
            throw new Error(`Error al verificar odontograma: ${error.message}`);
        }
    }
    /**
     * Convierte una fila de BD a una entidad Odontogram
     *
     * Las filas tienen estructura:
     * { id, patient_id, data: JSON, created_at, updated_at }
     */
    mapRowToOdontogram(row) {
        try {
            // La data está guardada como JSON en BD, necesitamos parsearla
            const data = typeof row.data === 'string'
                ? JSON.parse(row.data)
                : row.data;
            // Crear la entidad Odontogram desde el JSON
            return odontogram_entity_1.Odontogram.fromJSON(data);
        }
        catch (error) {
            throw new Error(`Error al mapear odontograma de BD: ${error.message}`);
        }
    }
}
exports.OdontogramRepository = OdontogramRepository;
