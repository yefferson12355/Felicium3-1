import { ToothState } from '../../../../core/domain/odontogram/tooth-state.enum';
import { ToothSurface } from '../../../../core/domain/odontogram/tooth-surface.enum';

/**
 * ToothDTO
 * 
 * DTO que representa un diente en la respuesta HTTP
 */
export interface ToothDTO {
  number: number;              // Número del diente
  toothType: string;           // Tipo (INCISOR, CANINE, PREMOLAR, MOLAR)
  state: ToothState;           // Estado actual
  surfaceProblems: Record<ToothSurface, boolean>; // Superficies con problemas
  clinicalNotes: string;       // Notas clínicas
  lastReview: string;          // Última revisión (ISO string)
}
