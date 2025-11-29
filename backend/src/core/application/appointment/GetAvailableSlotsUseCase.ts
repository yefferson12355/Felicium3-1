import { TimeSlot } from '../../domain/appointment/time-slot.entity';
import { IAppointmentRepository } from './interfaces';

/**
 * GetAvailableSlotsUseCase - Get available time slots for a date
 */
export class GetAvailableSlotsUseCase {
  private readonly BUSINESS_HOURS_START = 8;
  private readonly BUSINESS_HOURS_END = 18;
  private readonly SLOT_DURATION_MINUTES = 30;

  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(date: Date, dentistId?: string): Promise<TimeSlot[]> {
    // Validate it's a future weekday
    if (!TimeSlot.isFutureDate(date) || !TimeSlot.isWeekday(date)) {
      return [];
    }

    // Get all appointments for this date
    const appointmentsForDate = await this.appointmentRepository.findByDate(date);

    // Filter by dentist if provided
    const bookedSlots = dentistId
      ? appointmentsForDate.filter((apt) => apt.getDentistId() === dentistId)
      : appointmentsForDate;

    // Generate all available slots for the day
    const availableSlots: TimeSlot[] = [];

    for (let hour = this.BUSINESS_HOURS_START; hour < this.BUSINESS_HOURS_END; hour++) {
      const startTime = `${String(hour).padStart(2, '0')}:00`;
      const timeSlot = new TimeSlot(date, startTime);

      // Check if slot is already booked
      const isBooked = bookedSlots.some(
        (apt) =>
          apt.getTimeSlot().getStartTime() === startTime &&
          new Date(apt.getTimeSlot().getDate()).toDateString() === date.toDateString()
      );

      if (!isBooked) {
        availableSlots.push(timeSlot);
      }
    }

    return availableSlots;
  }
}
