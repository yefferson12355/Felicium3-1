import { TimeSlot } from '../../../src/core/domain/appointment/time-slot.entity';

describe('TimeSlot Entity', () => {
  describe('constructor and getters', () => {
    it('should create TimeSlot with date and times', () => {
      const date = new Date('2025-12-01');
      const slot = new TimeSlot(date, '14:00', '14:30');

      expect(slot.getDate()).toEqual(date);
      expect(slot.getStartTime()).toBe('14:00');
      expect(slot.getEndTime()).toBe('14:30');
      expect(slot.getDurationMinutes()).toBe(30);
    });

    it('should auto-calculate endTime if not provided', () => {
      const date = new Date('2025-12-01');
      const slot = new TimeSlot(date, '14:00');

      expect(slot.getEndTime()).toBe('14:30');
    });

    it('should auto-calculate endTime correctly for different hours', () => {
      const date = new Date('2025-12-01');

      const slot1 = new TimeSlot(date, '09:00');
      expect(slot1.getEndTime()).toBe('09:30');

      const slot2 = new TimeSlot(date, '17:30');
      expect(slot2.getEndTime()).toBe('18:00');
    });
  });

  describe('isBusinessHours()', () => {
    it('should accept times during business hours (8-18)', () => {
      expect(TimeSlot.isBusinessHours('08:00')).toBe(true);
      expect(TimeSlot.isBusinessHours('12:00')).toBe(true);
      expect(TimeSlot.isBusinessHours('17:59')).toBe(true);
    });

    it('should reject times outside business hours', () => {
      expect(TimeSlot.isBusinessHours('07:59')).toBe(false);
      expect(TimeSlot.isBusinessHours('18:00')).toBe(false);
      expect(TimeSlot.isBusinessHours('22:00')).toBe(false);
    });
  });

  describe('isFutureDate()', () => {
    it('should accept future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      expect(TimeSlot.isFutureDate(futureDate)).toBe(true);
    });

    it('should reject past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      expect(TimeSlot.isFutureDate(pastDate)).toBe(false);
    });

    it('should reject today date', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(TimeSlot.isFutureDate(today)).toBe(false);
    });
  });

  describe('isWeekday()', () => {
    it('should accept weekdays (Monday-Friday)', () => {
      // Monday, December 1, 2025
      const monday = new Date(2025, 11, 1);
      expect(TimeSlot.isWeekday(monday)).toBe(true);

      // Wednesday, December 3, 2025
      const wednesday = new Date(2025, 11, 3);
      expect(TimeSlot.isWeekday(wednesday)).toBe(true);
    });

    it('should reject weekends (Saturday-Sunday)', () => {
      // Saturday, December 6, 2025
      const saturday = new Date(2025, 11, 6);
      expect(TimeSlot.isWeekday(saturday)).toBe(false);

      // Sunday, December 7, 2025
      const sunday = new Date(2025, 11, 7);
      expect(TimeSlot.isWeekday(sunday)).toBe(false);
    });
  });

  describe('getDateTime()', () => {
    it('should return formatted date-time string', () => {
      const date = new Date('2025-12-01');
      const slot = new TimeSlot(date, '14:30');

      const dateTime = slot.getDateTime();
      expect(dateTime).toContain('2025-12-01');
      expect(dateTime).toContain('14:30');
    });
  });

  describe('toJSON() and fromJSON()', () => {
    it('should serialize and deserialize TimeSlot', () => {
      const date = new Date('2025-12-01');
      const original = new TimeSlot(date, '14:00', '14:30');

      const json = original.toJSON();
      const restored = TimeSlot.fromJSON(json);

      expect(restored.getStartTime()).toBe(original.getStartTime());
      expect(restored.getEndTime()).toBe(original.getEndTime());
    });
  });
});
