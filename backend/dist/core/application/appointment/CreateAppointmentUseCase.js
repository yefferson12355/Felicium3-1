"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentUseCase = void 0;
const appointment_entity_1 = require("../../domain/appointment/appointment.entity");
const appointment_status_enum_1 = require("../../domain/appointment/appointment-status.enum");
const crypto_1 = require("crypto");
/**
 * CreateAppointmentUseCase - Create a new appointment
 */
class CreateAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(patientId, timeSlot, reason, treatmentType, dentistId) {
        // Validate time slot
        if (!appointment_entity_1.Appointment.validateTimeSlot(timeSlot)) {
            throw new Error('Invalid time slot: must be future date, weekday, and business hours (8-18)');
        }
        // Check for conflicting appointments (same dentist or general time conflict)
        const conflictingAppointments = await this.appointmentRepository.findByDateAndTime(timeSlot.getDate(), timeSlot.getStartTime());
        if (conflictingAppointments.length > 0 && dentistId) {
            const dentistConflict = conflictingAppointments.find((apt) => apt.getDentistId() === dentistId);
            if (dentistConflict) {
                throw new Error('Dentist already has an appointment at this time');
            }
        }
        // Create appointment
        const appointment = new appointment_entity_1.Appointment((0, crypto_1.randomUUID)(), patientId, timeSlot, reason, appointment_status_enum_1.AppointmentStatus.PENDING, dentistId);
        appointment.setTreatmentType(treatmentType);
        // Save to repository
        await this.appointmentRepository.save(appointment);
        return appointment;
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
