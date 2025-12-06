/**
 * Tests para Database Mappers
 * 
 * Verifican la conversión correcta entre:
 * - Filas de DB (snake_case) ↔ Entidades de Dominio (camelCase)
 */

import 'reflect-metadata';
import { PatientDbMapper, PatientRow } from '../../../src/infrastructure/database/mappers/PatientDbMapper';
import { UserDbMapper, UserRow } from '../../../src/infrastructure/database/mappers/UserDbMapper';
import { AppointmentDbMapper, AppointmentRow } from '../../../src/infrastructure/database/mappers/AppointmentDbMapper';
import { UserRole } from '../../../src/core/domain/user/user-role.enum';
import { AppointmentStatus } from '../../../src/core/domain/appointment/appointment-status.enum';

describe('Database Mappers', () => {
  
  describe('PatientDbMapper', () => {
    const mockPatientRow: PatientRow = {
      id: 'patient-123',
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
      email: 'juan@example.com',
      telefono: '+51999999999',
      fecha_nacimiento: new Date('1990-05-15'),
      firma_digital: 'base64signature',
      odontograma: '{}',
      nombre_apoderado: null,
      direccion: 'Av. Principal 123',
      esta_activo: true,
      observaciones: ['Alergia a penicilina'],
      fecha_creacion: new Date('2024-01-01'),
      updated_at: new Date('2024-06-01'),
    };

    describe('toDomain', () => {
      it('should convert a DB row to Paciente entity', () => {
        const patient = PatientDbMapper.toDomain(mockPatientRow);

        expect(patient.id).toBe('patient-123');
        expect(patient.nombre).toBe('Juan');
        expect(patient.apellido).toBe('Pérez');
        expect(patient.dni).toBe('12345678');
        expect(patient.email).toBe('juan@example.com');
        expect(patient.telefono).toBe('+51999999999');
        expect(patient.firmaDigital).toBe('base64signature');
        expect(patient.direccion).toBe('Av. Principal 123');
        expect(patient.estaActivo).toBe(true);
        expect(patient.observaciones).toEqual(['Alergia a penicilina']);
      });

      it('should handle string dates from DB', () => {
        const rowWithStringDates: PatientRow = {
          ...mockPatientRow,
          fecha_nacimiento: '1990-05-15T00:00:00.000Z',
          fecha_creacion: '2024-01-01T00:00:00.000Z',
        };

        const patient = PatientDbMapper.toDomain(rowWithStringDates);

        expect(patient.fechaNacimiento).toBeInstanceOf(Date);
        expect(patient.fechaCreacion).toBeInstanceOf(Date);
      });

      it('should handle null observaciones', () => {
        const rowWithNullObs: PatientRow = {
          ...mockPatientRow,
          observaciones: null,
        };

        const patient = PatientDbMapper.toDomain(rowWithNullObs);

        expect(patient.observaciones).toEqual([]);
      });
    });

    describe('toDomainList', () => {
      it('should convert multiple rows to entities', () => {
        const rows = [mockPatientRow, { ...mockPatientRow, id: 'patient-456', nombre: 'María' }];

        const patients = PatientDbMapper.toDomainList(rows);

        expect(patients).toHaveLength(2);
        expect(patients[0].id).toBe('patient-123');
        expect(patients[1].id).toBe('patient-456');
        expect(patients[1].nombre).toBe('María');
      });

      it('should return empty array for empty input', () => {
        const patients = PatientDbMapper.toDomainList([]);

        expect(patients).toEqual([]);
      });
    });

    describe('toInsertValues', () => {
      it('should extract values in correct order for INSERT', () => {
        const patient = PatientDbMapper.toDomain(mockPatientRow);
        const newId = 'new-uuid-123';

        const values = PatientDbMapper.toInsertValues(patient, newId);

        expect(values[0]).toBe(newId); // id
        expect(values[1]).toBe('Juan'); // nombre
        expect(values[2]).toBe('Pérez'); // apellido
        expect(values[3]).toBe('12345678'); // dni
        expect(values[4]).toBe('juan@example.com'); // email
      });
    });
  });

  describe('UserDbMapper', () => {
    const mockUserRow: UserRow = {
      id: 'user-123',
      email: 'doctor@clinic.com',
      password_hash: '$2b$10$hashedpassword',
      first_name: 'Carlos',
      last_name: 'García',
      role: 'DENTIST',
      is_active: true,
      created_at: new Date('2024-01-01'),
      updated_at: new Date('2024-06-01'),
      last_login: new Date('2024-06-15'),
    };

    describe('toDomain', () => {
      it('should convert a DB row to User entity', () => {
        const user = UserDbMapper.toDomain(mockUserRow);

        expect(user.getId()).toBe('user-123');
        expect(user.getEmail()).toBe('doctor@clinic.com');
        expect(user.getFullName()).toBe('Carlos García');
        expect(user.getRole()).toBe(UserRole.DENTIST);
        expect(user.getIsActive()).toBe(true);
      });

      it('should handle null last_login', () => {
        const rowWithNullLogin: UserRow = {
          ...mockUserRow,
          last_login: null,
        };

        const user = UserDbMapper.toDomain(rowWithNullLogin);

        // No debería lanzar error
        expect(user.getId()).toBe('user-123');
      });

      it('should handle string dates from DB', () => {
        const rowWithStringDates: UserRow = {
          ...mockUserRow,
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-06-01T00:00:00.000Z',
          last_login: '2024-06-15T00:00:00.000Z',
        };

        const user = UserDbMapper.toDomain(rowWithStringDates);

        expect(user.getId()).toBe('user-123');
      });
    });

    describe('toDomainList', () => {
      it('should convert multiple rows to entities', () => {
        const rows = [
          mockUserRow, 
          { ...mockUserRow, id: 'user-456', email: 'admin@clinic.com', role: 'ADMIN' }
        ];

        const users = UserDbMapper.toDomainList(rows);

        expect(users).toHaveLength(2);
        expect(users[0].getEmail()).toBe('doctor@clinic.com');
        expect(users[1].getEmail()).toBe('admin@clinic.com');
      });
    });

    describe('toInsertValues', () => {
      it('should extract values in correct order for INSERT', () => {
        const user = UserDbMapper.toDomain(mockUserRow);

        const values = UserDbMapper.toInsertValues(user);

        expect(values[0]).toBe('user-123'); // id
        expect(values[1]).toBe('doctor@clinic.com'); // email
        expect(values[2]).toBe('$2b$10$hashedpassword'); // password_hash
        expect(values[3]).toBe('Carlos'); // first_name
        expect(values[4]).toBe('García'); // last_name
        expect(values[5]).toBe(UserRole.DENTIST); // role
      });
    });

    describe('toUpdateValues', () => {
      it('should extract values in correct order for UPDATE', () => {
        const user = UserDbMapper.toDomain(mockUserRow);

        const values = UserDbMapper.toUpdateValues(user);

        expect(values[0]).toBe('doctor@clinic.com'); // email
        expect(values[8]).toBe('user-123'); // id (last for WHERE clause)
      });
    });
  });

  describe('AppointmentDbMapper', () => {
    const mockAppointmentRow: AppointmentRow = {
      id: 'apt-123',
      patient_id: 'patient-123',
      dentist_id: 'dentist-456',
      fecha_hora: new Date('2024-12-15T10:00:00'),
      razon_consulta: 'Limpieza dental',
      status: 'PENDING',
      notas: 'Primera visita',
      treatment_type: 'CLEANING',
      created_at: new Date('2024-12-01'),
      updated_at: new Date('2024-12-01'),
      confirmed_at: null,
      cancelled_at: null,
      completed_at: null,
    };

    describe('toDomain', () => {
      it('should convert a DB row to Appointment entity', () => {
        const appointment = AppointmentDbMapper.toDomain(mockAppointmentRow);

        expect(appointment.getId()).toBe('apt-123');
        expect(appointment.getPatientId()).toBe('patient-123');
        expect(appointment.getDentistId()).toBe('dentist-456');
        expect(appointment.getReason()).toBe('Limpieza dental');
        expect(appointment.getStatus()).toBe(AppointmentStatus.PENDING);
      });

      it('should extract TimeSlot from fecha_hora', () => {
        const appointment = AppointmentDbMapper.toDomain(mockAppointmentRow);
        const timeSlot = appointment.getTimeSlot();

        expect(timeSlot).toBeDefined();
        expect(timeSlot.getStartTime()).toBe('10:00');
      });

      it('should handle null dentist_id', () => {
        const rowWithNullDentist: AppointmentRow = {
          ...mockAppointmentRow,
          dentist_id: null,
        };

        const appointment = AppointmentDbMapper.toDomain(rowWithNullDentist);

        expect(appointment.getDentistId()).toBeUndefined();
      });

      it('should handle string dates from DB', () => {
        const rowWithStringDates: AppointmentRow = {
          ...mockAppointmentRow,
          fecha_hora: '2024-12-15T10:00:00.000Z',
          created_at: '2024-12-01T00:00:00.000Z',
          updated_at: '2024-12-01T00:00:00.000Z',
        };

        const appointment = AppointmentDbMapper.toDomain(rowWithStringDates);

        expect(appointment.getId()).toBe('apt-123');
      });
    });

    describe('toDomainList', () => {
      it('should convert multiple rows to entities', () => {
        const rows = [
          mockAppointmentRow,
          { ...mockAppointmentRow, id: 'apt-456', status: 'CONFIRMED' }
        ];

        const appointments = AppointmentDbMapper.toDomainList(rows);

        expect(appointments).toHaveLength(2);
        expect(appointments[0].getStatus()).toBe(AppointmentStatus.PENDING);
        expect(appointments[1].getStatus()).toBe(AppointmentStatus.CONFIRMED);
      });
    });

    describe('toInsertValues', () => {
      it('should extract values in correct order for INSERT', () => {
        const appointment = AppointmentDbMapper.toDomain(mockAppointmentRow);

        const values = AppointmentDbMapper.toInsertValues(appointment);

        expect(values[0]).toBe('apt-123'); // id
        expect(values[1]).toBe('patient-123'); // patient_id
        expect(values[2]).toBe('dentist-456'); // dentist_id
        expect(values[3]).toBeInstanceOf(Date); // fecha_hora
        expect(values[4]).toBe('Limpieza dental'); // razon_consulta
      });
    });
  });
});
