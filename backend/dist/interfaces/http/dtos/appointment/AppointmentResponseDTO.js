"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentResponseDTO = void 0;
/**
 * AppointmentResponseDTO - Response with appointment data
 */
class AppointmentResponseDTO {
    constructor(id, patientId, timeSlot, status, reason, createdAt, updatedAt, dentistId, notes, treatmentType, confirmedAt, cancelledAt, completedAt) {
        this.id = id;
        this.patientId = patientId;
        this.dentistId = dentistId;
        this.timeSlot = timeSlot;
        this.status = status;
        this.reason = reason;
        this.notes = notes;
        this.treatmentType = treatmentType;
        this.createdAt = createdAt.toISOString();
        this.updatedAt = updatedAt.toISOString();
        this.confirmedAt = confirmedAt?.toISOString();
        this.cancelledAt = cancelledAt?.toISOString();
        this.completedAt = completedAt?.toISOString();
    }
}
exports.AppointmentResponseDTO = AppointmentResponseDTO;
