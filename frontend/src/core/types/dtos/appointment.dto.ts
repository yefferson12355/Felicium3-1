/**
 * DTOs de Appointments - Copiados del Backend
 * Backend: backend/src/interfaces/http/dtos/appointment/
 * 
 * REGLA: Mantener sincronizados con el backend
 */

export interface TimeSlotDTO {
  startTime: string;  // ISO 8601: "2025-01-20T14:00:00Z"
  endTime: string;    // ISO 8601: "2025-01-20T15:00:00Z"
}

export interface CreateAppointmentDTO {
  patientId: string;
  timeSlot: TimeSlotDTO;
  reason: string;
  treatmentType?: string;
  dentistId?: string;
}

export interface UpdateAppointmentDTO {
  timeSlot?: TimeSlotDTO;
  reason?: string;
  treatmentType?: string;
  dentistId?: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface AppointmentResponseDTO {
  id: string;
  patientId: string;
  dentistId?: string;
  timeSlot: TimeSlotDTO;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  treatmentType?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  completedAt?: string;
}

export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled';

export interface AppointmentListResponseDTO {
  appointments: AppointmentResponseDTO[];
  total: number;
}
