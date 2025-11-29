/**
 * CreateOdontogramDTO
 * 
 * DTO para crear un nuevo odontograma
 * Viene del cliente (Frontend) en la solicitud HTTP
 */
export interface CreateOdontogramDTO {
  patientId: string;           // ID del paciente
  patientAge: number;          // Edad del paciente
  dentureType: 'PERMANENT' | 'TEMPORARY';  // Tipo de dentadura
}
