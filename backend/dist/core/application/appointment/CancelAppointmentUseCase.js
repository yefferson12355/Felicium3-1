"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAppointmentUseCase = void 0;
/**
 * CancelAppointmentUseCase - Cancel an appointment
 */
class CancelAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId) {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found`);
        }
        // Cancel appointment (business rule validation)
        appointment.cancel();
        // Save updated appointment
        await this.appointmentRepository.update(appointment);
        return appointment;
    }
}
exports.CancelAppointmentUseCase = CancelAppointmentUseCase;
