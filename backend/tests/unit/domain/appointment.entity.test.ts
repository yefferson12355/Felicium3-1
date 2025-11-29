import { Appointment } from '../../../src/core/domain/appointment/appointment.entity';
import { AppointmentStatus } from '../../../src/core/domain/appointment/appointment-status.enum';
import { TimeSlot } from '../../../src/core/domain/appointment/time-slot.entity';

describe('Appointment Entity', () => {
  let appointment: Appointment;

  beforeEach(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); // 5 days from now
    futureDate.setHours(0, 0, 0, 0);

    const timeSlot = new TimeSlot(futureDate, '10:00', '10:30');
    appointment = new Appointment(
      'apt-123',
      'patient-456',
      timeSlot,
      'Root canal treatment'
    );
  });

  describe('Initial state', () => {
    it('should create appointment with PENDING status', () => {
      expect(appointment.getStatus()).toBe(AppointmentStatus.PENDING);
      expect(appointment.getPatientId()).toBe('patient-456');
      expect(appointment.getReason()).toBe('Root canal treatment');
    });

    it('should have undefined dentistId initially', () => {
      expect(appointment.getDentistId()).toBeUndefined();
    });
  });

  describe('confirm()', () => {
    it('should transition from PENDING to CONFIRMED', () => {
      appointment.confirm();
      expect(appointment.getStatus()).toBe(AppointmentStatus.CONFIRMED);
      expect(appointment.getConfirmedAt()).toBeDefined();
    });

    it('should throw error if already confirmed', () => {
      appointment.confirm();
      expect(() => appointment.confirm()).toThrow('Only PENDING appointments can be confirmed');
    });
  });

  describe('assignDentist()', () => {
    it('should assign dentist', () => {
      appointment.assignDentist('dentist-789');
      expect(appointment.getDentistId()).toBe('dentist-789');
    });
  });

  describe('startAppointment()', () => {
    it('should transition from CONFIRMED to IN_PROGRESS', () => {
      appointment.confirm();
      appointment.startAppointment();
      expect(appointment.getStatus()).toBe(AppointmentStatus.IN_PROGRESS);
    });

    it('should throw error if not CONFIRMED', () => {
      expect(() => appointment.startAppointment()).toThrow(
        'Only CONFIRMED appointments can be started'
      );
    });
  });

  describe('complete()', () => {
    it('should transition from IN_PROGRESS to COMPLETED', () => {
      appointment.confirm();
      appointment.startAppointment();
      appointment.complete();

      expect(appointment.getStatus()).toBe(AppointmentStatus.COMPLETED);
      expect(appointment.getCompletedAt()).toBeDefined();
    });

    it('should throw error if not IN_PROGRESS', () => {
      expect(() => appointment.complete()).toThrow(
        'Only IN_PROGRESS appointments can be completed'
      );
    });
  });

  describe('cancel()', () => {
    it('should cancel PENDING appointment', () => {
      appointment.cancel();
      expect(appointment.getStatus()).toBe(AppointmentStatus.CANCELLED);
      expect(appointment.getCancelledAt()).toBeDefined();
    });

    it('should cancel CONFIRMED appointment', () => {
      appointment.confirm();
      appointment.cancel();
      expect(appointment.getStatus()).toBe(AppointmentStatus.CANCELLED);
    });

    it('should throw error if COMPLETED', () => {
      appointment.confirm();
      appointment.startAppointment();
      appointment.complete();

      expect(() => appointment.cancel()).toThrow(
        'Cannot cancel COMPLETED or already CANCELLED appointments'
      );
    });

    it('should throw error if already CANCELLED', () => {
      appointment.cancel();
      expect(() => appointment.cancel()).toThrow(
        'Cannot cancel COMPLETED or already CANCELLED appointments'
      );
    });
  });

  describe('updateNotes()', () => {
    it('should update appointment notes', () => {
      const notes = 'Patient has high anxiety, proceed with caution';
      appointment.updateNotes(notes);
      expect(appointment.getNotes()).toBe(notes);
    });
  });

  describe('setTreatmentType()', () => {
    it('should set treatment type', () => {
      appointment.setTreatmentType('Endodontics');
      expect(appointment.getTreatmentType()).toBe('Endodontics');
    });
  });

  describe('isUpcoming()', () => {
    it('should return true for upcoming CONFIRMED appointment', () => {
      appointment.confirm();
      expect(appointment.isUpcoming()).toBe(true);
    });

    it('should return false for non-CONFIRMED appointment', () => {
      expect(appointment.isUpcoming()).toBe(false);
    });
  });

  describe('toJSON() and fromJSON()', () => {
    it('should serialize and deserialize appointment', () => {
      appointment.confirm();
      appointment.assignDentist('dentist-789');

      const json = appointment.toJSON();
      const restored = Appointment.fromJSON(json);

      expect(restored.getId()).toBe(appointment.getId());
      expect(restored.getPatientId()).toBe(appointment.getPatientId());
      expect(restored.getDentistId()).toBe(appointment.getDentistId());
      expect(restored.getStatus()).toBe(appointment.getStatus());
    });
  });
});
