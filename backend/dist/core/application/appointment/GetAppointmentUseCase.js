"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentUseCase = void 0;
/**
 * GetAppointmentUseCase - Get appointment by ID
 */
class GetAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(appointmentId) {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error(`Appointment with ID ${appointmentId} not found`);
        }
        return appointment;
    }
}
exports.GetAppointmentUseCase = GetAppointmentUseCase;
