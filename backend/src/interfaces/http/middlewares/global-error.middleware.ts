import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../../../shared/errors/AppError';

/**
 * Logger Interface - Para extensibilidad futura
 */
interface ErrorLogger {
  error(message: string, meta?: Record<string, any>): void;
  warn(message: string, meta?: Record<string, any>): void;
}

/**
 * Logger simple (reemplazar con Winston/Pino en producción)
 */
const logger: ErrorLogger = {
  error: (message, meta) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta || '');
  },
  warn: (message, meta) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
  },
};

/**
 * Interfaz estándar para respuestas de error
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    path: string;
    method: string;
  };
  // Solo en desarrollo
  stack?: string;
}

/**
 * Determina si estamos en modo desarrollo
 */
const isDevelopment = (): boolean => {
  return process.env.NODE_ENV !== 'production';
};

/**
 * Formatea el error para la respuesta HTTP
 */
const formatErrorResponse = (
  error: AppError,
  req: Request
): ErrorResponse => {
  const response: ErrorResponse = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
    },
  };

  // Incluir stack trace solo en desarrollo
  if (isDevelopment() && error.stack) {
    response.stack = error.stack;
  }

  return response;
};

/**
 * Maneja errores conocidos de librerías externas
 */
const handleKnownErrors = (error: any): AppError | null => {
  // Error de validación de class-validator (ya manejado por validation.middleware)
  if (error.code === 'VALIDATION_ERROR') {
    return new AppError(error.message, 400, 'VALIDATION_ERROR', true, error.details);
  }

  // Error de PostgreSQL: Violación de restricción única
  if (error.code === '23505') {
    const detail = error.detail || '';
    const match = detail.match(/Key \((\w+)\)=\(([^)]+)\)/);
    const field = match?.[1] || 'campo';
    const value = match?.[2] || 'valor';
    return new AppError(
      `Ya existe un registro con ${field}: ${value}`,
      409,
      'DUPLICATE_RESOURCE',
      true,
      { field, value }
    );
  }

  // Error de PostgreSQL: Violación de clave foránea
  if (error.code === '23503') {
    return new AppError(
      'El recurso referenciado no existe',
      400,
      'FOREIGN_KEY_VIOLATION',
      true
    );
  }

  // Error de PostgreSQL: Violación de NOT NULL
  if (error.code === '23502') {
    const column = error.column || 'campo';
    return new AppError(
      `El campo ${column} es requerido`,
      400,
      'REQUIRED_FIELD',
      true,
      { field: column }
    );
  }

  // Error de JWT
  if (error.name === 'JsonWebTokenError') {
    return new AppError('Token inválido', 401, 'INVALID_TOKEN', true);
  }

  if (error.name === 'TokenExpiredError') {
    return new AppError('Token expirado', 401, 'TOKEN_EXPIRED', true);
  }

  // Error de sintaxis JSON
  if (error instanceof SyntaxError && 'body' in error) {
    return new AppError('JSON inválido en el body', 400, 'INVALID_JSON', true);
  }

  return null;
};

/**
 * Global Error Handler Middleware
 * 
 * Este middleware DEBE ir al final de todos los middlewares y rutas.
 * Captura TODOS los errores y los formatea de manera consistente.
 */
export const globalErrorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Si ya se envió una respuesta, pasar al siguiente handler
  if (res.headersSent) {
    return _next(error);
  }

  let appError: AppError;

  // 1. Si ya es un AppError, usarlo directamente
  if (error instanceof AppError) {
    appError = error;
  } 
  // 2. Intentar convertir errores conocidos
  else {
    const knownError = handleKnownErrors(error);
    if (knownError) {
      appError = knownError;
    } 
    // 3. Error desconocido - tratar como error interno
    else {
      appError = new AppError(
        isDevelopment() ? error.message : 'Error interno del servidor',
        500,
        'INTERNAL_SERVER_ERROR',
        false
      );
      // Preservar el stack original para debugging
      appError.stack = error.stack;
    }
  }

  // Logging
  if (appError.statusCode >= 500) {
    // Errores de servidor - log completo
    logger.error('Server Error', {
      code: appError.code,
      message: appError.message,
      stack: appError.stack,
      path: req.originalUrl,
      method: req.method,
      body: req.body,
      user: (req as any).user?.id,
    });
  } else if (!appError.isOperational) {
    // Errores no operacionales (bugs)
    logger.error('Non-operational Error', {
      code: appError.code,
      message: appError.message,
      stack: appError.stack,
    });
  } else {
    // Errores operacionales (esperados) - log mínimo
    logger.warn('Client Error', {
      code: appError.code,
      message: appError.message,
      path: req.originalUrl,
    });
  }

  // Enviar respuesta
  const response = formatErrorResponse(appError, req);
  res.status(appError.statusCode).json(response);
};

/**
 * Middleware para rutas no encontradas (404)
 * Debe ir ANTES del globalErrorHandler pero DESPUÉS de todas las rutas
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new AppError(
    `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    404,
    'ROUTE_NOT_FOUND',
    true
  );
  next(error);
};

/**
 * Wrapper para funciones async en controladores
 * 
 * Permite que los errores de funciones async sean capturados
 * automáticamente por el globalErrorHandler.
 * 
 * Uso:
 * router.get('/users', asyncHandler(controller.getUsers));
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Alias corto para asyncHandler
 */
export const catchAsync = asyncHandler;
