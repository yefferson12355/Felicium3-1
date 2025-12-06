/**
 * Tests para validación de DTOs
 * 
 * Estos tests verifican que los DTOs validan correctamente:
 * 1. Campos requeridos
 * 2. Formatos (email, fecha, etc.)
 * 3. Longitudes mínimas/máximas
 * 4. Patrones (DNI, teléfono, etc.)
 */

import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDTO } from '../../../src/interfaces/http/dtos/auth/LoginDTO';
import { RegisterDTO } from '../../../src/interfaces/http/dtos/auth/RegisterDTO';
import { CreatePatientDTO } from '../../../src/interfaces/http/dtos/patient/CreatePatientDTO';

describe('DTO Validation', () => {

  describe('LoginDTO', () => {
    const createLoginDTO = (data: Partial<LoginDTO>): LoginDTO => {
      return plainToInstance(LoginDTO, data);
    };

    it('should pass with valid data', async () => {
      const dto = createLoginDTO({
        email: 'test@example.com',
        password: 'SecurePass123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid email', async () => {
      const dto = createLoginDTO({
        email: 'not-an-email',
        password: 'SecurePass123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('email');
    });

    it('should fail with short password', async () => {
      const dto = createLoginDTO({
        email: 'test@example.com',
        password: '123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('password');
    });

    it('should fail with empty email', async () => {
      const dto = createLoginDTO({
        email: '',
        password: 'SecurePass123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('RegisterDTO', () => {
    const createRegisterDTO = (data: Partial<RegisterDTO>): RegisterDTO => {
      return plainToInstance(RegisterDTO, data);
    };

    const validData = {
      email: 'test@example.com',
      password: 'SecurePass123',
      firstName: 'Juan',
      lastName: 'Pérez',
    };

    it('should pass with valid data', async () => {
      const dto = createRegisterDTO(validData);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with weak password (no uppercase)', async () => {
      const dto = createRegisterDTO({
        ...validData,
        password: 'password123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.property === 'password')).toBe(true);
    });

    it('should fail with weak password (no lowercase)', async () => {
      const dto = createRegisterDTO({
        ...validData,
        password: 'PASSWORD123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail with weak password (no numbers)', async () => {
      const dto = createRegisterDTO({
        ...validData,
        password: 'PasswordOnly',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail with short firstName', async () => {
      const dto = createRegisterDTO({
        ...validData,
        firstName: 'A',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('firstName');
    });

    it('should fail with invalid characters in firstName', async () => {
      const dto = createRegisterDTO({
        ...validData,
        firstName: 'Juan123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should allow optional role', async () => {
      const dto = createRegisterDTO(validData);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });

  describe('CreatePatientDTO', () => {
    const createPatientDTO = (data: Partial<CreatePatientDTO>): CreatePatientDTO => {
      return plainToInstance(CreatePatientDTO, data);
    };

    const validPatientData = {
      dni: '12345678',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com',
      fechaNacimiento: '1990-01-15',
      firmaDigital: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
    };

    it('should pass with valid data', async () => {
      const dto = createPatientDTO(validPatientData);

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail with invalid DNI (not 8 digits)', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        dni: '1234567', // 7 digits
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toBe('dni');
    });

    it('should fail with DNI containing letters', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        dni: '1234567A',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail with invalid email format', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        email: 'not-valid-email',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.property === 'email')).toBe(true);
    });

    it('should fail with invalid date format', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        fechaNacimiento: '15-01-1990', // Wrong format
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail with nombre containing numbers', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        nombre: 'Juan123',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should allow optional fields', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        telefono: undefined,
        direccion: undefined,
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should validate optional phone format if provided', async () => {
      const dto = createPatientDTO({
        ...validPatientData,
        telefono: '987654321',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });
  });
});
