/**
 * TimeSlot - Represents a 30-minute time slot for appointments
 */
export class TimeSlot {
  private date: Date;           // Fecha de la cita
  private startTime: string;    // Hora de inicio (formato HH:MM)
  private endTime: string;      // Hora de fin (formato HH:MM)
  private durationMinutes: number = 30; // Duración en minutos

  constructor(date: Date, startTime: string, endTime: string = '') {
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime || this.calculateEndTime(startTime);
  }

  /**
   * Calculate end time (30 minutes after start time)
   */
  private calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + this.durationMinutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  /**
   * Validate that time is in business hours (8:00 - 18:00)
   */
  static isBusinessHours(startTime: string): boolean {
    const [hours] = startTime.split(':').map(Number);
    return hours >= 8 && hours < 18;
  }

  /**
   * Validate that date is not in the past
   */
  static isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Validate that date is not weekends (Monday-Friday only)
   */
  static isWeekday(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
  }

  // Getters
  getDate(): Date {
    return this.date;
  }

  getStartTime(): string {
    return this.startTime;
  }

  getEndTime(): string {
    return this.endTime;
  }

  getDurationMinutes(): number {
    return this.durationMinutes;
  }

  /**
   * Get full datetime string
   */
  getDateTime(): string {
    return `${this.date.toISOString().split('T')[0]} ${this.startTime}`;
  }

  /**
   * Convert to plain object
   */
  toJSON(): any {
    return {
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      durationMinutes: this.durationMinutes,
    };
  }

  /**
   * Create from plain object
   */
  static fromJSON(data: any): TimeSlot {
    return new TimeSlot(new Date(data.date), data.startTime, data.endTime);
  }
}
