"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentDTO = void 0;
/**
 * CreateAppointmentDTO - Input for creating appointment
 */
class CreateAppointmentDTO {
    constructor(patientId, timeSlot, reason, treatmentType, dentistId) {
        this.patientId = patientId;
        this.timeSlot = timeSlot;
        this.reason = reason;
        this.treatmentType = treatmentType;
        this.dentistId = dentistId;
    }
}
exports.CreateAppointmentDTO = CreateAppointmentDTO;
