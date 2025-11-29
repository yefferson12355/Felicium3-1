import { ToothState } from '../../../../core/domain/odontogram/tooth-state.enum';

/**
 * UpdateOdontogramDTO
 * 
 * DTO para actualizar un odontograma (cambiar estado de diente)
 * Viene del cliente en la solicitud HTTP
 */
export interface UpdateOdontogramDTO {
  toothNumber: number;         // Número del diente (11-48 o 51-85)
  newState: ToothState;        // Nuevo estado del diente
  notes?: string;              // Notas clínicas opcionales
}
