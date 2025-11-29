"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotDTO = void 0;
/**
 * TimeSlotDTO - Data Transfer Object for TimeSlot
 */
class TimeSlotDTO {
    constructor(date, startTime, endTime) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
exports.TimeSlotDTO = TimeSlotDTO;
