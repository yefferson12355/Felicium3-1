/**
 * AppError - Clase base para TODOS los errores de la aplicación
 * 
 * Esta clase permite:
 * 1. Estandarizar el formato de errores
 * 2. Incluir código HTTP apropiado
 * 3. Diferenciar errores operacionales de errores de programación
 * 4. Incluir código de error único para el frontend
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details?: Record<string, any>
  ) {
    super(message);
    
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational; // true = error esperado, false = bug
    this.details = details;
    
    // Mantiene el stack trace correcto
    Error.captureStackTrace(this, this.constructor);
    
    // Nombre de la clase para instanceof
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ============================================
// ERRORES DE VALIDACIÓN (400)
// ============================================

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, string[]>) {
    super(message, 400, 'VALIDATION_ERROR', true, details);
  }
}

export class InvalidInputError extends AppError {
  constructor(field: string, reason: string) {
    super(`Campo inválido: ${field}. ${reason}`, 400, 'INVALID_INPUT', true, { field, reason });
  }
}

// ============================================
// ERRORES DE AUTENTICACIÓN (401)
// ============================================

export class UnauthorizedError extends AppError {
  constructor(message: string = 'No autenticado') {
    super(message, 401, 'UNAUTHORIZED', true);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Email o contraseña incorrectos', 401, 'INVALID_CREDENTIALS', true);
  }
}

export class InvalidTokenError extends AppError {
  constructor() {
    super('Token inválido o expirado', 401, 'INVALID_TOKEN', true);
  }
}

export class TokenExpiredError extends AppError {
  constructor() {
    super('El token ha expirado', 401, 'TOKEN_EXPIRED', true);
  }
}

// ============================================
// ERRORES DE AUTORIZACIÓN (403)
// ============================================

export class ForbiddenError extends AppError {
  constructor(message: string = 'No tienes permisos para realizar esta acción') {
    super(message, 403, 'FORBIDDEN', true);
  }
}

export class InsufficientPermissionsError extends AppError {
  constructor(requiredRole: string) {
    super(`Se requiere rol: ${requiredRole}`, 403, 'INSUFFICIENT_PERMISSIONS', true, { requiredRole });
  }
}

// ============================================
// ERRORES DE RECURSO NO ENCONTRADO (404)
// ============================================

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier 
      ? `${resource} con ID ${identifier} no encontrado`
      : `${resource} no encontrado`;
    super(message, 404, 'NOT_FOUND', true, { resource, identifier });
  }
}

export class PatientNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Paciente', id);
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Usuario', id);
  }
}

export class AppointmentNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Cita', id);
  }
}

export class OdontogramNotFoundError extends NotFoundError {
  constructor(id: string) {
    super('Odontograma', id);
  }
}

// ============================================
// ERRORES DE CONFLICTO (409)
// ============================================

export class ConflictError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 409, 'CONFLICT', true, details);
  }
}

export class DuplicateResourceError extends AppError {
  constructor(resource: string, field: string, value: string) {
    super(`Ya existe un ${resource} con ${field}: ${value}`, 409, 'DUPLICATE_RESOURCE', true, { resource, field, value });
  }
}

export class UserAlreadyExistsError extends ConflictError {
  constructor(email: string) {
    super(`Ya existe un usuario con el email: ${email}`, { email });
  }
}

export class PatientAlreadyExistsError extends ConflictError {
  constructor(dni: string) {
    super(`Ya existe un paciente con DNI: ${dni}`, { dni });
  }
}

export class AppointmentConflictError extends ConflictError {
  constructor(date: string, time: string) {
    super(`Ya existe una cita programada para ${date} a las ${time}`, { date, time });
  }
}

// ============================================
// ERRORES DE NEGOCIO (422)
// ============================================

export class BusinessRuleError extends AppError {
  constructor(message: string, rule?: string) {
    super(message, 422, 'BUSINESS_RULE_VIOLATION', true, { rule });
  }
}

export class WeakPasswordError extends AppError {
  constructor() {
    super(
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
      422,
      'WEAK_PASSWORD',
      true
    );
  }
}

export class InvalidAppointmentStatusError extends BusinessRuleError {
  constructor(currentStatus: string, attemptedAction: string) {
    super(`No se puede ${attemptedAction} una cita con estado: ${currentStatus}`, 'APPOINTMENT_STATUS_TRANSITION');
  }
}

export class PastDateError extends BusinessRuleError {
  constructor() {
    super('No se pueden programar citas en fechas pasadas', 'FUTURE_DATE_REQUIRED');
  }
}

// ============================================
// ERRORES DE SERVIDOR (500)
// ============================================

export class InternalServerError extends AppError {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500, 'INTERNAL_SERVER_ERROR', false);
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string) {
    super(`Error de base de datos durante: ${operation}`, 500, 'DATABASE_ERROR', false, { operation });
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string) {
    super(`Error al comunicarse con servicio externo: ${service}`, 502, 'EXTERNAL_SERVICE_ERROR', false, { service });
  }
}
