/**
 * PatientDbMapper
 * 
 * Responsabilidad ÚNICA: Convertir entre filas de PostgreSQL y entidad Paciente
 * 
 * ┌─────────────────┐       ┌─────────────────┐
 * │   DB Row        │ ←───→ │   Paciente      │
 * │  (snake_case)   │       │   (camelCase)   │
 * └─────────────────┘       └─────────────────┘
 * 
 * Convenciones:
 * - toDomain(): row → Entity (para leer de DB)
 * - toPersistence(): Entity → row (para escribir a DB)
 */

import { Paciente } from '../../../core/domain/patient/patient.entity';

/**
 * Interfaz que representa una fila de la tabla 'patients'
 * Esto documenta exactamente qué campos esperamos de la DB
 */
export interface PatientRow {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string | null;
  fecha_nacimiento: Date | string;
  firma_digital: string;
  odontograma: string;
  nombre_apoderado: string | null;
  direccion: string | null;
  esta_activo: boolean;
  observaciones: string[] | null;
  fecha_creacion: Date | string;
  updated_at?: Date | string;
}

/**
 * Interfaz para datos de persistencia (INSERT/UPDATE)
 */
export interface PatientPersistenceData {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string | null;
  fecha_nacimiento: Date;
  firma_digital: string;
  odontograma: string;
  nombre_apoderado: string | null;
  direccion: string | null;
  esta_activo: boolean;
  observaciones: string[];
  fecha_creacion: Date;
}

export class PatientDbMapper {
  /**
   * Convierte una fila de PostgreSQL a entidad Paciente
   * 
   * @param row - Fila de la tabla patients
   * @returns Paciente - Entidad de dominio reconstruida
   */
  static toDomain(row: PatientRow): Paciente {
    return Paciente.crearExistente({
      id: row.id,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email,
      dni: row.dni,
      telefono: row.telefono,
      // Asegurar que fechas sean Date objects
      fechaNacimiento: row.fecha_nacimiento instanceof Date 
        ? row.fecha_nacimiento 
        : new Date(row.fecha_nacimiento),
      firmaDigital: row.firma_digital,
      odontograma: row.odontograma,
      nombreApoderado: row.nombre_apoderado,
      direccion: row.direccion,
      estaActivo: row.esta_activo,
      observaciones: row.observaciones || [],
      fechaCreacion: row.fecha_creacion instanceof Date 
        ? row.fecha_creacion 
        : new Date(row.fecha_creacion),
    });
  }

  /**
   * Convierte múltiples filas a entidades
   * 
   * @param rows - Array de filas de la tabla patients
   * @returns Array de entidades Paciente
   */
  static toDomainList(rows: PatientRow[]): Paciente[] {
    return rows.map(row => this.toDomain(row));
  }

  /**
   * Convierte una entidad Paciente a datos para persistir en DB
   * 
   * @param patient - Entidad Paciente
   * @returns Objeto con campos mapeados a snake_case para la DB
   */
  static toPersistence(patient: Paciente): PatientPersistenceData {
    return {
      id: patient.id!,
      nombre: patient.nombre,
      apellido: patient.apellido,
      dni: patient.dni,
      email: patient.email,
      telefono: patient.telefono,
      fecha_nacimiento: patient.fechaNacimiento,
      firma_digital: patient.firmaDigital,
      odontograma: patient.odontograma,
      nombre_apoderado: patient.nombreApoderado,
      direccion: patient.direccion,
      esta_activo: patient.estaActivo,
      observaciones: patient.observaciones,
      fecha_creacion: patient.fechaCreacion,
    };
  }

  /**
   * Extrae los valores para un INSERT ordenados
   * 
   * @param patient - Entidad Paciente
   * @param newId - ID generado para nuevo registro
   * @returns Array de valores en orden para INSERT
   */
  static toInsertValues(patient: Paciente, newId: string): any[] {
    return [
      newId,
      patient.nombre,
      patient.apellido,
      patient.dni,
      patient.email,
      patient.estaActivo,
      patient.fechaCreacion,
      patient.firmaDigital,
      patient.odontograma,
      patient.fechaNacimiento,
      patient.telefono,
      patient.direccion,
      patient.nombreApoderado,
      patient.observaciones,
    ];
  }

  /**
   * Extrae los valores para un UPDATE ordenados
   * 
   * @param patient - Entidad Paciente
   * @returns Array de valores en orden para UPDATE
   */
  static toUpdateValues(patient: Paciente): any[] {
    return [
      patient.nombre,
      patient.apellido,
      patient.email,
      patient.telefono,
      patient.direccion,
      patient.nombreApoderado,
      patient.fechaNacimiento,
      patient.firmaDigital,
      patient.odontograma,
      patient.observaciones,
      patient.estaActivo,
      patient.id,
    ];
  }
}
