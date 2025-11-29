/**
 * DTOs de Odontogram - Copiados del Backend
 * Backend: backend/src/interfaces/http/dtos/odontogram/
 */

export type DentureType = 'PERMANENT' | 'TEMPORARY';

export type ToothCondition = 
  | 'HEALTHY'
  | 'CAVITY'
  | 'FILLING'
  | 'CROWN'
  | 'MISSING'
  | 'IMPLANT'
  | 'ENDODONTIC'
  | 'EXTRACTION';

export interface ToothDTO {
  toothNumber: string;  // "11", "48", etc
  condition: ToothCondition;
  notes?: string;
}

export interface CreateOdontogramDTO {
  patientId: string;
  patientAge: number;
  dentureType: DentureType;
}

export interface UpdateOdontogramDTO {
  toothNumber: string;
  condition: ToothCondition;
  notes?: string;
}

export interface OdontogramResponseDTO {
  id: string;
  patientId: string;
  dentureType: DentureType;
  teeth: Record<string, ToothDTO>;  // { "11": {...}, "12": {...} }
  createdAt: string;
  updatedAt: string;
}
