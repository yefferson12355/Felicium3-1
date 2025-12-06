/**
 * Central Error Exports
 * 
 * Este archivo agrupa todas las exportaciones de errores
 * para facilitar las importaciones en el resto de la aplicación.
 * 
 * Uso:
 * import { ValidationError, NotFoundError, AppError } from '../shared/errors';
 */

// Nueva arquitectura de errores (recomendado usar estos)
export * from './AppError';
export * from './http-status';

// Legacy errors - re-exportar con alias para evitar conflictos
export { DomainError } from './DomainError';
export { ValidationError as LegacyValidationError } from './ValidationError';
export { NotFoundError as LegacyNotFoundError } from './NotFoundError';