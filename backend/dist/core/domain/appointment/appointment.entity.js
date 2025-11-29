"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const appointment_status_enum_1 = require("./appointment-status.enum");
const time_slot_entity_1 = require("./time-slot.entity");
/**
 * Appointment Entity - Represents a dental appointment
 */
class Appointment {
    constructor(id, patientId, timeSlot, reason, status = appointment_status_enum_1.AppointmentStatus.PENDING, dentistId, notes, treatmentType, createdAt = new Date(), updatedAt = new Date(), confirmedAt, cancelledAt, completedAt) {
        this.id = id;
        this.patientId = patientId;
        this.timeSlot = timeSlot;
        this.reason = reason;
        this.status = status;
        this.dentistId = dentistId;
        this.notes = notes;
        this.treatmentType = treatmentType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.confirmedAt = confirmedAt;
        this.cancelledAt = cancelledAt;
        this.completedAt = completedAt;
    }
    /**
     * Validate appointment time slot
     */
    static validateTimeSlot(timeSlot) {
        return (time_slot_entity_1.TimeSlot.isFutureDate(timeSlot.getDate()) &&
            time_slot_entity_1.TimeSlot.isWeekday(timeSlot.getDate()) &&
            time_slot_entity_1.TimeSlot.isBusinessHours(timeSlot.getStartTime()));
    }
    /**
     * Confirm appointment (PENDING -> CONFIRMED)
     */
    confirm() {
        if (this.status !== appointment_status_enum_1.AppointmentStatus.PENDING) {
            throw new Error('Only PENDING appointments can be confirmed');
        }
        this.status = appointment_status_enum_1.AppointmentStatus.CONFIRMED;
        this.confirmedAt = new Date();
        this.updatedAt = new Date();
    }
    /**
     * Assign dentist
     */
    assignDentist(dentistId) {
        this.dentistId = dentistId;
        this.updatedAt = new Date();
    }
    /**
     * Mark as in progress
     */
    startAppointment() {
        if (this.status !== appointment_status_enum_1.AppointmentStatus.CONFIRMED) {
            throw new Error('Only CONFIRMED appointments can be started');
        }
        this.status = appointment_status_enum_1.AppointmentStatus.IN_PROGRESS;
        this.updatedAt = new Date();
    }
    /**
     * Complete appointment (IN_PROGRESS -> COMPLETED)
     */
    complete() {
        if (this.status !== appointment_status_enum_1.AppointmentStatus.IN_PROGRESS) {
            throw new Error('Only IN_PROGRESS appointments can be completed');
        }
        this.status = appointment_status_enum_1.AppointmentStatus.COMPLETED;
        this.completedAt = new Date();
        this.updatedAt = new Date();
    }
    /**
     * Cancel appointment
     */
    cancel() {
        if (this.status === appointment_status_enum_1.AppointmentStatus.COMPLETED ||
            this.status === appointment_status_enum_1.AppointmentStatus.CANCELLED) {
            throw new Error('Cannot cancel COMPLETED or already CANCELLED appointments');
        }
        this.status = appointment_status_enum_1.AppointmentStatus.CANCELLED;
        this.cancelledAt = new Date();
        this.updatedAt = new Date();
    }
    /**
     * Mark as no-show
     */
    markAsNoShow() {
        if (this.status !== appointment_status_enum_1.AppointmentStatus.CONFIRMED) {
            throw new Error('Only CONFIRMED appointments can be marked as no-show');
        }
        this.status = appointment_status_enum_1.AppointmentStatus.NO_SHOW;
        this.updatedAt = new Date();
    }
    /**
     * Update notes
     */
    updateNotes(notes) {
        this.notes = notes;
        this.updatedAt = new Date();
    }
    /**
     * Set treatment type
     */
    setTreatmentType(treatmentType) {
        this.treatmentType = treatmentType;
        this.updatedAt = new Date();
    }
    /**
     * Check if appointment is upcoming
     */
    isUpcoming() {
        return (this.status === appointment_status_enum_1.AppointmentStatus.CONFIRMED &&
            this.timeSlot.getDate() > new Date());
    }
    /**
     * Check if appointment is past
     */
    isPast() {
        return this.timeSlot.getDate() < new Date();
    }
    // Getters
    getId() {
        return this.id;
    }
    getPatientId() {
        return this.patientId;
    }
    getDentistId() {
        return this.dentistId;
    }
    getTimeSlot() {
        return this.timeSlot;
    }
    getStatus() {
        return this.status;
    }
    getReason() {
        return this.reason;
    }
    getNotes() {
        return this.notes;
    }
    getTreatmentType() {
        return this.treatmentType;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getConfirmedAt() {
        return this.confirmedAt;
    }
    getCancelledAt() {
        return this.cancelledAt;
    }
    getCompletedAt() {
        return this.completedAt;
    }
    /**
     * Convert to plain object
     */
    toJSON() {
        return {
            id: this.id,
            patientId: this.patientId,
            dentistId: this.dentistId,
            timeSlot: this.timeSlot.toJSON(),
            status: this.status,
            reason: this.reason,
            notes: this.notes,
            treatmentType: this.treatmentType,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            confirmedAt: this.confirmedAt,
            cancelledAt: this.cancelledAt,
            completedAt: this.completedAt,
        };
    }
    /**
     * Create from plain object
     */
    static fromJSON(data) {
        return new Appointment(data.id, data.patientId, time_slot_entity_1.TimeSlot.fromJSON(data.timeSlot), data.reason, data.status, data.dentistId, data.notes, data.treatmentType, new Date(data.createdAt), new Date(data.updatedAt), data.confirmedAt ? new Date(data.confirmedAt) : undefined, data.cancelledAt ? new Date(data.cancelledAt) : undefined, data.completedAt ? new Date(data.completedAt) : undefined);
    }
}
exports.Appointment = Appointment;
