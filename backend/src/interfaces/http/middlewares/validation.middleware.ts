import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationError as AppValidationError } from '../../../shared/errors';

/**
 * Middleware de Validación de DTOs
 * 
 * Este middleware intercepta las peticiones y valida que el body
 * cumpla con las reglas definidas en el DTO usando class-validator.
 * 
 * Los errores se propagan al globalErrorHandler para formato consistente.
 */

/**
 * Formatea los errores de validación en un formato amigable
 */
const formatValidationErrors = (errors: ValidationError[]): Record<string, string[]> => {
  const formattedErrors: Record<string, string[]> = {};
  
  errors.forEach(error => {
    const property = error.property;
    const constraints = error.constraints;
    
    if (constraints) {
      formattedErrors[property] = Object.values(constraints);
    }
    
    // Manejar errores anidados
    if (error.children && error.children.length > 0) {
      const nestedErrors = formatValidationErrors(error.children);
      Object.keys(nestedErrors).forEach(key => {
        formattedErrors[`${property}.${key}`] = nestedErrors[key];
      });
    }
  });
  
  return formattedErrors;
};

/**
 * Crea un middleware de validación para un DTO específico
 * 
 * @param DtoClass - La clase DTO que contiene las reglas de validación
 * @param skipMissingProperties - Si es true, no valida propiedades faltantes (útil para PATCH)
 */
export const validateDto = <T extends object>(
  DtoClass: new () => T,
  skipMissingProperties: boolean = false
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Convertir el body plano a una instancia de la clase DTO
    const dtoInstance = plainToInstance(DtoClass, req.body, {
      excludeExtraneousValues: false,
      enableImplicitConversion: true,
    });
    
    // Ejecutar la validación
    const errors = await validate(dtoInstance, {
      skipMissingProperties,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: {
        target: false,
        value: false,
      },
    });
    
    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      return next(new AppValidationError('Los datos proporcionados no son válidos', formattedErrors));
    }
    
    // Reemplazar el body con la instancia validada y sanitizada
    req.body = dtoInstance;
    next();
  };
};

/**
 * Middleware para validar parámetros de URL (params)
 */
export const validateParams = <T extends object>(
  DtoClass: new () => T
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(DtoClass, req.params, {
      enableImplicitConversion: true,
    });
    
    const errors = await validate(dtoInstance, {
      whitelist: true,
      validationError: { target: false, value: false },
    });
    
    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      return next(new AppValidationError('Los parámetros de la URL no son válidos', formattedErrors));
    }
    
    req.params = dtoInstance as any;
    next();
  };
};

/**
 * Middleware para validar query strings
 */
export const validateQuery = <T extends object>(
  DtoClass: new () => T
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(DtoClass, req.query, {
      enableImplicitConversion: true,
    });
    
    const errors = await validate(dtoInstance, {
      skipMissingProperties: true,
      whitelist: true,
      validationError: { target: false, value: false },
    });
    
    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      return next(new AppValidationError('Los parámetros de consulta no son válidos', formattedErrors));
    }
    
    req.query = dtoInstance as any;
    next();
  };
};
