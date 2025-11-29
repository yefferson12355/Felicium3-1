"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmAppointmentUseCase = void 0;
/**
 * ConfirmAppointmentUseCase - Confirm a pending appointment
 */
class ConfirmAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId, dentistId) {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found`);
        }
        // Confirm appointment (business rule validation)
        appointment.confirm();
        // Assign dentist if provided
        if (dentistId) {
            appointment.assignDentist(dentistId);
        }
        // Save updated appointment
        await this.appointmentRepository.update(appointment);
        return appointment;
    }
}
exports.ConfirmAppointmentUseCase = ConfirmAppointmentUseCase;
