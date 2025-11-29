"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const appointment_entity_1 = require("../../../core/domain/appointment/appointment.entity");
const appointment_status_enum_1 = require("../../../core/domain/appointment/appointment-status.enum");
const time_slot_entity_1 = require("../../../core/domain/appointment/time-slot.entity");
const database_config_1 = require("../../config/database.config");
/**
 * AppointmentRepository - PostgreSQL implementation for Appointment persistence
 */
class AppointmentRepository {
    async save(appointment) {
        const data = appointment.toJSON();
        // Combine date and start_time into a single fecha_hora timestamp
        const appointmentDate = new Date(data.timeSlot.date);
        const [hours, minutes] = data.timeSlot.startTime.split(':');
        appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        const query = `
      INSERT INTO appointments (id, patient_id, dentist_id, fecha_hora, razon_consulta, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
        const values = [
            data.id,
            data.patientId,
            data.dentistId || null,
            appointmentDate,
            data.reason,
            data.status || 'PENDING',
            new Date(),
            new Date(),
        ];
        await database_config_1.pgClient.query(query, values);
    }
    async findById(id) {
        const query = `SELECT * FROM appointments WHERE id = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToAppointment(result.rows[0]);
    }
    async findAll(filters) {
        let query = `SELECT * FROM appointments WHERE deleted_at IS NULL`;
        const values = [];
        let paramCount = 1;
        if (filters?.patientId) {
            query += ` AND patient_id = $${paramCount++}`;
            values.push(filters.patientId);
        }
        if (filters?.dentistId) {
            query += ` AND dentist_id = $${paramCount++}`;
            values.push(filters.dentistId);
        }
        if (filters?.status) {
            query += ` AND status = $${paramCount++}`;
            values.push(filters.status);
        }
        if (filters?.fromDate) {
            query += ` AND fecha_hora >= $${paramCount++}`;
            values.push(filters.fromDate);
        }
        if (filters?.toDate) {
            query += ` AND fecha_hora <= $${paramCount++}`;
            values.push(filters.toDate);
        }
        query += ` ORDER BY fecha_hora ASC`;
        const result = await database_config_1.pgClient.query(query, values);
        return result.rows.map((row) => this.mapRowToAppointment(row));
    }
    async findByPatientId(patientId) {
        return this.findAll({ patientId });
    }
    async findByDentistId(dentistId) {
        return this.findAll({ dentistId });
    }
    async findByDate(date) {
        const query = `SELECT * FROM appointments WHERE DATE(fecha_hora) = DATE($1) AND deleted_at IS NULL ORDER BY fecha_hora ASC`;
        const result = await database_config_1.pgClient.query(query, [date]);
        return result.rows.map((row) => this.mapRowToAppointment(row));
    }
    async findByDateAndTime(date, startTime) {
        const query = `SELECT * FROM appointments WHERE DATE(fecha_hora) = DATE($1) AND status != $2 AND deleted_at IS NULL ORDER BY fecha_hora ASC`;
        const result = await database_config_1.pgClient.query(query, [date, appointment_status_enum_1.AppointmentStatus.CANCELLED]);
        return result.rows.map((row) => this.mapRowToAppointment(row));
    }
    async update(appointment) {
        const data = appointment.toJSON();
        const query = `
      UPDATE appointments
      SET patient_id = $1, dentist_id = $2, date = $3, start_time = $4, end_time = $5,
          status = $6, reason = $7, notes = $8, treatment_type = $9, updated_at = $10,
          confirmed_at = $11, cancelled_at = $12, completed_at = $13
      WHERE id = $14 AND deleted_at IS NULL
    `;
        const values = [
            data.patientId,
            data.dentistId || null,
            data.timeSlot.date,
            data.timeSlot.startTime,
            data.timeSlot.endTime,
            data.status,
            data.reason,
            data.notes || null,
            data.treatmentType || null,
            data.updatedAt,
            data.confirmedAt || null,
            data.cancelledAt || null,
            data.completedAt || null,
            data.id,
        ];
        await database_config_1.pgClient.query(query, values);
    }
    async delete(id) {
        const query = `UPDATE appointments SET deleted_at = NOW() WHERE id = $1`;
        await database_config_1.pgClient.query(query, [id]);
    }
    async exists(id) {
        const query = `SELECT COUNT(*) FROM appointments WHERE id = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [id]);
        return parseInt(result.rows[0].count) > 0;
    }
    /**
     * Map database row to Appointment entity
     */
    mapRowToAppointment(row) {
        // Extraer fecha de fecha_hora
        const fechaHora = new Date(row.fecha_hora);
        const fechaStr = fechaHora.toISOString().split('T')[0];
        // Crear TimeSlot con los datos disponibles
        const timeSlot = new time_slot_entity_1.TimeSlot(fechaHora, fechaHora.toISOString().split('T')[1]?.substring(0, 5) || '09:00', fechaHora.toISOString().split('T')[1]?.substring(0, 5) || '10:00');
        return new appointment_entity_1.Appointment(row.id, row.patient_id, timeSlot, row.razon_consulta || '', row.status, row.dentist_id || undefined, row.notas || undefined, undefined, new Date(row.created_at), new Date(row.updated_at), undefined, undefined, undefined);
    }
}
exports.AppointmentRepository = AppointmentRepository;
