/**
 * Tests para las clases de errores personalizados
 * 
 * Estos tests verifican que:
 * 1. Los errores se crean con los códigos HTTP correctos
 * 2. Los códigos de error son consistentes
 * 3. Los mensajes son apropiados
 * 4. La jerarquía de errores funciona correctamente
 */

import {
  AppError,
  ValidationError,
  UnauthorizedError,
  InvalidCredentialsError,
  InvalidTokenError,
  ForbiddenError,
  NotFoundError,
  PatientNotFoundError,
  UserNotFoundError,
  AppointmentNotFoundError,
  ConflictError,
  UserAlreadyExistsError,
  PatientAlreadyExistsError,
  BusinessRuleError,
  WeakPasswordError,
  InternalServerError,
  DatabaseError,
} from '../../../src/shared/errors';

describe('AppError Classes', () => {
  
  describe('AppError (Base Class)', () => {
    it('should create error with default values', () => {
      const error = new AppError('Test error');
      
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('INTERNAL_ERROR');
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });

    it('should create error with custom values', () => {
      const error = new AppError('Custom error', 400, 'CUSTOM_CODE', false, { field: 'test' });
      
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('CUSTOM_CODE');
      expect(error.isOperational).toBe(false);
      expect(error.details).toEqual({ field: 'test' });
    });

    it('should capture stack trace', () => {
      const error = new AppError('Test');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ValidationError (400)', () => {
    it('should create validation error with correct status code', () => {
      const error = new ValidationError('Invalid data');
      
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.isOperational).toBe(true);
    });

    it('should include field details', () => {
      const details = {
        email: ['El email es inválido'],
        password: ['La contraseña es muy corta'],
      };
      const error = new ValidationError('Datos inválidos', details);
      
      expect(error.details).toEqual(details);
    });
  });

  describe('UnauthorizedError (401)', () => {
    it('should create with default message', () => {
      const error = new UnauthorizedError();
      
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('UNAUTHORIZED');
      expect(error.message).toBe('No autenticado');
    });

    it('should allow custom message', () => {
      const error = new UnauthorizedError('Token expirado');
      
      expect(error.message).toBe('Token expirado');
    });
  });

  describe('InvalidCredentialsError (401)', () => {
    it('should have fixed message for security', () => {
      const error = new InvalidCredentialsError();
      
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('INVALID_CREDENTIALS');
      expect(error.message).toBe('Email o contraseña incorrectos');
    });
  });

  describe('InvalidTokenError (401)', () => {
    it('should indicate invalid token', () => {
      const error = new InvalidTokenError();
      
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe('INVALID_TOKEN');
    });
  });

  describe('ForbiddenError (403)', () => {
    it('should create with default message', () => {
      const error = new ForbiddenError();
      
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe('FORBIDDEN');
    });

    it('should allow custom message', () => {
      const error = new ForbiddenError('No tienes acceso a este recurso');
      
      expect(error.message).toBe('No tienes acceso a este recurso');
    });
  });

  describe('NotFoundError (404)', () => {
    it('should create with resource name', () => {
      const error = new NotFoundError('Usuario');
      
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.message).toBe('Usuario no encontrado');
    });

    it('should include identifier if provided', () => {
      const error = new NotFoundError('Usuario', '123');
      
      expect(error.message).toBe('Usuario con ID 123 no encontrado');
      expect(error.details).toEqual({ resource: 'Usuario', identifier: '123' });
    });
  });

  describe('Specific NotFoundErrors', () => {
    it('PatientNotFoundError should indicate patient', () => {
      const error = new PatientNotFoundError('patient-123');
      
      expect(error.statusCode).toBe(404);
      expect(error.message).toContain('Paciente');
      expect(error.message).toContain('patient-123');
    });

    it('UserNotFoundError should indicate user', () => {
      const error = new UserNotFoundError('user-456');
      
      expect(error.message).toContain('Usuario');
    });

    it('AppointmentNotFoundError should indicate appointment', () => {
      const error = new AppointmentNotFoundError('apt-789');
      
      expect(error.message).toContain('Cita');
    });
  });

  describe('ConflictError (409)', () => {
    it('should create conflict error', () => {
      const error = new ConflictError('El recurso ya existe');
      
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe('CONFLICT');
    });
  });

  describe('UserAlreadyExistsError (409)', () => {
    it('should include email in message', () => {
      const error = new UserAlreadyExistsError('test@example.com');
      
      expect(error.statusCode).toBe(409);
      expect(error.message).toContain('test@example.com');
      expect(error.details).toEqual({ email: 'test@example.com' });
    });
  });

  describe('PatientAlreadyExistsError (409)', () => {
    it('should include DNI in message', () => {
      const error = new PatientAlreadyExistsError('12345678');
      
      expect(error.statusCode).toBe(409);
      expect(error.message).toContain('12345678');
    });
  });

  describe('BusinessRuleError (422)', () => {
    it('should indicate business rule violation', () => {
      const error = new BusinessRuleError('No se puede cancelar una cita completada');
      
      expect(error.statusCode).toBe(422);
      expect(error.code).toBe('BUSINESS_RULE_VIOLATION');
    });

    it('should include rule name if provided', () => {
      const error = new BusinessRuleError('Error', 'APPOINTMENT_CANCEL');
      
      expect(error.details).toEqual({ rule: 'APPOINTMENT_CANCEL' });
    });
  });

  describe('WeakPasswordError (422)', () => {
    it('should have descriptive message', () => {
      const error = new WeakPasswordError();
      
      expect(error.statusCode).toBe(422);
      expect(error.code).toBe('WEAK_PASSWORD');
      expect(error.message).toContain('8 caracteres');
      expect(error.message).toContain('mayúscula');
    });
  });

  describe('InternalServerError (500)', () => {
    it('should create with default message', () => {
      const error = new InternalServerError();
      
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('INTERNAL_SERVER_ERROR');
      expect(error.isOperational).toBe(false); // Non-operational by default
    });
  });

  describe('DatabaseError (500)', () => {
    it('should include operation details', () => {
      const error = new DatabaseError('INSERT');
      
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('DATABASE_ERROR');
      expect(error.message).toContain('INSERT');
    });
  });

  describe('Error Hierarchy', () => {
    it('all errors should be instanceof AppError', () => {
      const errors = [
        new ValidationError('test'),
        new UnauthorizedError(),
        new ForbiddenError(),
        new NotFoundError('test'),
        new ConflictError('test'),
        new BusinessRuleError('test'),
        new InternalServerError(),
      ];

      errors.forEach(error => {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toBeInstanceOf(Error);
      });
    });

    it('PatientNotFoundError should be instanceof NotFoundError', () => {
      const error = new PatientNotFoundError('123');
      
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error).toBeInstanceOf(AppError);
    });
  });
});
