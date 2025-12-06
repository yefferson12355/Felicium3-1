import { IAppointmentRepository } from '../../../core/application/appointment/interfaces/IAppointmentRepository';
import { Appointment } from '../../../core/domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../../core/domain/appointment/appointment-status.enum';
import { TimeSlot } from '../../../core/domain/appointment/time-slot.entity';
import { pgClient } from '../../config/database.config';
import { AppointmentDbMapper, AppointmentRow } from '../mappers/AppointmentDbMapper';

/**
 * AppointmentRepository - PostgreSQL implementation for Appointment persistence
 * Usa AppointmentDbMapper para conversiones DB ↔ Entity
 */
export class AppointmentRepository implements IAppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    const values = AppointmentDbMapper.toInsertValues(appointment);
    const query = `
      INSERT INTO appointments (id, patient_id, dentist_id, fecha_hora, razon_consulta, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pgClient.query(query, values);
  }

  async findById(id: string): Promise<Appointment | null> {
    const query = `SELECT * FROM appointments WHERE id = $1 AND deleted_at IS NULL`;
    const result = await pgClient.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    // ✅ Usar mapper centralizado
    return AppointmentDbMapper.toDomain(result.rows[0] as AppointmentRow);
  }

  async findAll(filters?: {
    patientId?: string;
    dentistId?: string;
    status?: AppointmentStatus;
    fromDate?: Date;
    toDate?: Date;
  }): Promise<Appointment[]> {
    let query = `SELECT * FROM appointments WHERE deleted_at IS NULL`;
    const values: any[] = [];
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
    const result = await pgClient.query(query, values);

    // ✅ Usar mapper centralizado para listas
    return AppointmentDbMapper.toDomainList(result.rows as AppointmentRow[]);
  }

  async findByPatientId(patientId: string): Promise<Appointment[]> {
    return this.findAll({ patientId });
  }

  async findByDentistId(dentistId: string): Promise<Appointment[]> {
    return this.findAll({ dentistId });
  }

  async findByDate(date: Date): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE DATE(fecha_hora) = DATE($1) AND deleted_at IS NULL ORDER BY fecha_hora ASC`;
    const result = await pgClient.query(query, [date]);

    // ✅ Usar mapper centralizado para listas
    return AppointmentDbMapper.toDomainList(result.rows as AppointmentRow[]);
  }

  async findByDateAndTime(date: Date, startTime: string): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE DATE(fecha_hora) = DATE($1) AND status != $2 AND deleted_at IS NULL ORDER BY fecha_hora ASC`;
    const result = await pgClient.query(query, [date, AppointmentStatus.CANCELLED]);

    // ✅ Usar mapper centralizado para listas
    return AppointmentDbMapper.toDomainList(result.rows as AppointmentRow[]);
  }

  async update(appointment: Appointment): Promise<void> {
    const values = AppointmentDbMapper.toUpdateValues(appointment);
    const query = `
      UPDATE appointments
      SET patient_id = $1, dentist_id = $2, fecha_hora = $3, razon_consulta = $4,
          status = $5, notas = $6, treatment_type = $7, updated_at = $8,
          confirmed_at = $9, cancelled_at = $10, completed_at = $11
      WHERE id = $12 AND deleted_at IS NULL
    `;

    await pgClient.query(query, values);
  }

  async delete(id: string): Promise<void> {
    const query = `UPDATE appointments SET deleted_at = NOW() WHERE id = $1`;
    await pgClient.query(query, [id]);
  }

  async exists(id: string): Promise<boolean> {
    const query = `SELECT COUNT(*) FROM appointments WHERE id = $1 AND deleted_at IS NULL`;
    const result = await pgClient.query(query, [id]);
    return parseInt(result.rows[0].count) > 0;
  }
}
