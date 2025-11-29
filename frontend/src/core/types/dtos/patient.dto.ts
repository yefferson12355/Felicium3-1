/**
 * DTOs de Patients - Copiados del Backend
 * Backend: backend/src/interfaces/http/dtos/patient/
 */

export interface CreatePatientDTO {
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;  // YYYY-MM-DD
  telefono?: string;
  direccion?: string;
  nombreApoderado?: string;
}

export interface UpdatePatientDTO {
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  fechaNacimiento?: string;
  telefono?: string;
  direccion?: string;
  nombreApoderado?: string;
}

// DTO que recibe el frontend (según rol del usuario)
export interface PatientAdminResponseDTO {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono?: string | null;
  direccion?: string | null;
  observaciones?: string[];
  firmaDigital?: string;
  odontograma?: any;
  nombreApoderado?: string | null;
  estaActivo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface PatientDoctorResponseDTO {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono?: string | null;
  direccion?: string | null;
  observaciones?: string[];
  firmaDigital?: string;
  odontograma?: any;
}

export interface PatientReceptionistResponseDTO {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono?: string | null;
  direccion?: string | null;
}

export interface PatientSelfResponseDTO {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  telefono?: string | null;
}

export interface PatientListResponseDTO {
  patients: PatientAdminResponseDTO[];
  total: number;
}
