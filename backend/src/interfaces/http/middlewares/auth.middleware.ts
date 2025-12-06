// src/interfaces/http/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { verifyToken as verifyJwtToken } from '../../../infrastructure/auth/JwtService';
import { UnauthorizedError, InvalidTokenError } from '../../../shared/errors';

/**
 * Middleware de autenticación
 * 
 * Verifica el token JWT en el header Authorization.
 * Los errores se propagan al globalErrorHandler para formato consistente.
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedError('Acceso denegado. Se requiere autenticación.'));
  }

  try {
    // 1. Verificar y decodificar el token usando el servicio de Infraestructura
    const decodedUser = verifyJwtToken(token); 
    
    // 2. Adjuntar el usuario decodificado a la petición
    (req as any).user = decodedUser; 

    // 3. Continuar con la siguiente función (Controller o otro Middleware)
    next();
  } catch (error) {
    // Si la verificación falla (token expirado o inválido)
    return next(new InvalidTokenError());
  }
};

/**
 * authMiddleware - Alias for use in app.use()
 */
export const authMiddleware = verifyToken;