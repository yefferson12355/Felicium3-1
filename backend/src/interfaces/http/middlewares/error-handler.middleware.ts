// src/interfaces/http/middlewares/error-handler.middleware.ts

import { Request, Response, NextFunction } from 'express';
// Asumimos que tienes clases de errores tipadas (ValidationError, NotFoundError)
// import { ValidationError, NotFoundError } from '../../shared/errors'; 

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500; // Por defecto: Error interno del servidor
  let message = 'Error interno del servidor. Por favor, contacte a soporte.';
  
  // 1. Manejo de Errores del Dominio (Errores conocidos y tipados)
  if (err instanceof ValidationError || err.name === 'ValidationError') {
    // 400 Bad Request: Usado cuando fallan las ReglasPaciente.validarDNI, etc.
    statusCode = 400;
    message = err.message;
  } else if (err instanceof NotFoundError || err.name === 'NotFoundError') {
    // 404 Not Found: Usado cuando se busca un recurso que no existe (ej: Paciente por ID)
    statusCode = 404;
    message = err.message;
  } else if (err.isJoi || err.code === '23505') { 
    // 409 Conflict: Usado para errores de duplicidad (ej: DNI o Email ya existen en BD)
    statusCode = 409;
    message = 'El recurso ya existe (DNI o email duplicado).';
  }

  // 2. Respuesta Final
  // NUNCA devolver el 'stack' (la pila de errores) en producción por seguridad.
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: message,
    // Devolvemos el error si no estamos en producción para debug
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
};