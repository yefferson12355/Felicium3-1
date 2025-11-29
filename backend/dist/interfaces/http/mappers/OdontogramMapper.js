"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdontogramMapper = void 0;
const odontogram_behavior_1 = require("../../../core/domain/odontogram/odontogram.behavior");
/**
 * OdontogramMapper
 *
 * Convierte la entidad Odontogram a DTO para respuestas HTTP
 *
 * Por qué es necesario:
 * - La entidad tiene métodos y lógica
 * - El DTO es solo datos planos para enviar por HTTP
 * - Evita exponer toda la lógica al cliente
 */
class OdontogramMapper {
    /**
     * Convierte un Odontogram a OdontogramResponseDTO
     */
    static toPersistence(odontogram) {
        const allTeeth = odontogram.getAllTeeth();
        const summary = odontogram_behavior_1.OdontogramBehavior.getHealthReport(odontogram);
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
                surfaceProblems: tooth.getSurfacesWithProblems().reduce((acc, surface) => {
                    acc[surface] = true;
                    return acc;
                }, {}),
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
}
exports.OdontogramMapper = OdontogramMapper;
