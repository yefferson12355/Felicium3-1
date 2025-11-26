// src/interfaces/http/middlewares/audit.middleware.ts

import { Request, Response, NextFunction } from 'express';

// Asumimos que tienes una función global para loguear, o solo usamos console.log
const logger = console.log;

export const auditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now(); // Marca de tiempo de inicio
  const url = req.originalUrl;
  const method = req.method;
  
  // Intentamos obtener el ID del usuario del token (adjuntado por authMiddleware)
  const userId = (req as any).user ? (req as any).user.id : 'GUEST'; 

  // Continuar con el flujo normal de la aplicación
  next();

  // Escuchar el evento 'finish' (cuando la respuesta se envía al cliente)
  res.on('finish', () => {
    const duration = Date.now() - startTime; // Calcula el tiempo total
    const statusCode = res.statusCode; // Código de respuesta (200, 400, 500, etc.)

    // Registra el evento completo
    logger(`[AUDIT] ${method}:${url} - USER:${userId} - STATUS:${statusCode} - TIME:${duration}ms`);
  });
};