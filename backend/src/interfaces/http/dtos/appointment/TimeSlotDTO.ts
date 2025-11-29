/**
 * TimeSlotDTO - Data Transfer Object for TimeSlot
 */
export class TimeSlotDTO {
  date: string;          // ISO date string
  startTime: string;     // HH:MM format
  endTime: string;       // HH:MM format

  constructor(date: string, startTime: string, endTime: string) {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
