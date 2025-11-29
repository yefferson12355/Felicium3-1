"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvailableSlotsUseCase = void 0;
const time_slot_entity_1 = require("../../domain/appointment/time-slot.entity");
/**
 * GetAvailableSlotsUseCase - Get available time slots for a date
 */
class GetAvailableSlotsUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
        this.BUSINESS_HOURS_START = 8;
        this.BUSINESS_HOURS_END = 18;
        this.SLOT_DURATION_MINUTES = 30;
    }
    async execute(date, dentistId) {
        // Validate it's a future weekday
        if (!time_slot_entity_1.TimeSlot.isFutureDate(date) || !time_slot_entity_1.TimeSlot.isWeekday(date)) {
            return [];
        }
        // Get all appointments for this date
        const appointmentsForDate = await this.appointmentRepository.findByDate(date);
        // Filter by dentist if provided
        const bookedSlots = dentistId
            ? appointmentsForDate.filter((apt) => apt.getDentistId() === dentistId)
            : appointmentsForDate;
        // Generate all available slots for the day
        const availableSlots = [];
        for (let hour = this.BUSINESS_HOURS_START; hour < this.BUSINESS_HOURS_END; hour++) {
            const startTime = `${String(hour).padStart(2, '0')}:00`;
            const timeSlot = new time_slot_entity_1.TimeSlot(date, startTime);
            // Check if slot is already booked
            const isBooked = bookedSlots.some((apt) => apt.getTimeSlot().getStartTime() === startTime &&
                new Date(apt.getTimeSlot().getDate()).toDateString() === date.toDateString());
            if (!isBooked) {
                availableSlots.push(timeSlot);
            }
        }
        return availableSlots;
    }
}
exports.GetAvailableSlotsUseCase = GetAvailableSlotsUseCase;
