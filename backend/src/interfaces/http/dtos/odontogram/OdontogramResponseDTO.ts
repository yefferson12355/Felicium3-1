import { ToothDTO } from './ToothDTO';

/**
 * OdontogramResponseDTO
 * 
 * DTO que se devuelve al cliente en la respuesta HTTP
 * Contiene toda la información del odontograma formateada
 */
export interface OdontogramResponseDTO {
  id: string;                  // ID del odontograma
  patientId: string;           // ID del paciente
  patientAge: number;          // Edad del paciente
  dentureType: 'PERMANENT' | 'TEMPORARY';
  teeth: ToothDTO[];           // Array de todos los dientes
  summary: {
    totalTeeth: number;
    healthyTeeth: number;
    affectedTeeth: number;
    missingTeeth: number;
    healthPercentage: number;
  };
  clinicalNotes: string;
  createdAt: string;           // ISO string
  updatedAt: string;           // ISO string
}
