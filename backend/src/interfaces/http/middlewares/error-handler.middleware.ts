import { Request, Response, NextFunction } from 'express';

// CORRECCIÓN DE RUTA:
// ../ (sales a http)
// ../ (sales a interfaces)
// ../ (sales a src)
// ./shared/errors (entras a shared/errors)
// Al tener el index.ts, ya no necesitas especificar el nombre del archivo
import { ValidationError, NotFoundError } from '../../../shared/errors'; 

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // ... (El resto de tu código está perfecto, déjalo igual)
  let statusCode = 500;
  let message = 'Error interno del servidor. Por favor, contacte a soporte.';
  
  if (err instanceof ValidationError || err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof NotFoundError || err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message;
  } else if (err.isJoi || err.code === '23505') { 
    statusCode = 409;
    message = 'El recurso ya existe (DNI o email duplicado).';
  }

  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
};