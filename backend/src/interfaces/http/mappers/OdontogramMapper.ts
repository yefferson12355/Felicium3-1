import { Odontogram } from '../../../core/domain/odontogram/odontogram.entity';
import { OdontogramResponseDTO } from '../dtos/odontogram/OdontogramResponseDTO';
import { ToothDTO } from '../dtos/odontogram/ToothDTO';
import { OdontogramBehavior } from '../../../core/domain/odontogram/odontogram.behavior';

/**
 * OdontogramMapper - HTTP Response Mapper
 * 
 * Convierte entidades de dominio a DTOs para respuestas HTTP
 * 
 * ┌─────────────────┐       ┌─────────────────┐
 * │   Odontogram    │ ────→ │  Response DTO   │
 * │   (Entity)      │       │   (JSON)        │
 * └─────────────────┘       └─────────────────┘
 * 
 * Por qué es necesario:
 * - La entidad tiene métodos y lógica
 * - El DTO es solo datos planos para enviar por HTTP
 * - Evita exponer toda la lógica al cliente
 * 
 * Convenciones:
 * - toDTO(): Entity → DTO (para respuestas HTTP)
 * - toResponse(): Alias de toDTO para claridad
 */
export class OdontogramMapper {
  /**
   * Convierte un Odontogram a OdontogramResponseDTO
   * 
   * @param odontogram - Entidad de dominio
   * @returns DTO listo para respuesta HTTP
   */
  static toDTO(odontogram: Odontogram): OdontogramResponseDTO {
    const allTeeth = odontogram.getAllTeeth();
    const summary = OdontogramBehavior.getHealthReport(odontogram);

    return {
      id: odontogram.getId(),
      patientId: odontogram.getPatientId(),
      patientAge: odontogram.getPatientAge(),
      dentureType: odontogram.getDentureType(),
      
      // Convertir cada diente a ToothDTO
      teeth: allTeeth.map(tooth => ({
        number: tooth.getNumber(),
        toothType: tooth.getToothType(),
        state: tooth.getState(),
        surfaceProblems: tooth.getSurfacesWithProblems().reduce(
          (acc, surface) => {
            acc[surface] = true;
            return acc;
          },
          {} as Record<string, boolean>
        ),
        clinicalNotes: tooth.getClinicalNotes(),
        lastReview: tooth.getLastReview().toISOString(),
      })),

      // Información de salud general
      summary: {
        totalTeeth: summary.totalTeeth,
        healthyTeeth: summary.healthyTeeth,
        affectedTeeth: summary.affectedTeeth,
        missingTeeth: summary.missingTeeth,
        healthPercentage: summary.healthPercentage,
      },

      clinicalNotes: odontogram.getClinicalNotes(),
      createdAt: odontogram.getCreatedAt().toISOString(),
      updatedAt: odontogram.getUpdatedAt().toISOString(),
    };
  }

  /**
   * Alias para toDTO - más explícito en controladores
   */
  static toResponse(odontogram: Odontogram): OdontogramResponseDTO {
    return this.toDTO(odontogram);
  }

  /**
   * Convierte múltiples entidades a DTOs
   */
  static toDTOList(odontograms: Odontogram[]): OdontogramResponseDTO[] {
    return odontograms.map(o => this.toDTO(o));
  }
}
