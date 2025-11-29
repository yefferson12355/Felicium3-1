"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlot = void 0;
/**
 * TimeSlot - Represents a 30-minute time slot for appointments
 */
class TimeSlot {
    constructor(date, startTime, endTime = '') {
        this.durationMinutes = 30; // Duración en minutos
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime || this.calculateEndTime(startTime);
    }
    /**
     * Calculate end time (30 minutes after start time)
     */
    calculateEndTime(startTime) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + this.durationMinutes;
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    }
    /**
     * Validate that time is in business hours (8:00 - 18:00)
     */
    static isBusinessHours(startTime) {
        const [hours] = startTime.split(':').map(Number);
        return hours >= 8 && hours < 18;
    }
    /**
     * Validate that date is not in the past
     */
    static isFutureDate(date) {
        return date > new Date();
    }
    /**
     * Validate that date is not weekends (Monday-Friday only)
     */
    static isWeekday(date) {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
    }
    // Getters
    getDate() {
        return this.date;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getDurationMinutes() {
        return this.durationMinutes;
    }
    /**
     * Get full datetime string
     */
    getDateTime() {
        return `${this.date.toISOString().split('T')[0]} ${this.startTime}`;
    }
    /**
     * Convert to plain object
     */
    toJSON() {
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
    static fromJSON(data) {
        return new TimeSlot(new Date(data.date), data.startTime, data.endTime);
    }
}
exports.TimeSlot = TimeSlot;
