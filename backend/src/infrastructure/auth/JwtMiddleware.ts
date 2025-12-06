import { Request, Response, NextFunction } from 'express';
import { verifyToken as verifyTokenJwt } from './JwtService';
import { UnauthorizedError, InvalidTokenError } from '../../shared/errors';

/**
 * JWT Middleware - Verifica el token JWT en el header Authorization
 * 
 * Uso: router.get('/protected', verifyToken, controller.method)
 * 
 * Los errores se propagan al globalErrorHandler para formato consistente.
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedError('Token no proporcionado');
    }

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedError('Formato de token inválido. Use: Bearer <token>');
    }

    const token = parts[1];

    // Verify token
    const decoded = verifyTokenJwt(token);
    
    // Add user info to request
    (req as any).user = decoded;
    
    next();
  } catch (error: any) {
    // Si ya es un error de nuestra aplicación, propagarlo
    if (error.statusCode) {
      next(error);
      return;
    }
    // Si es un error de JWT, convertirlo
    next(new InvalidTokenError());
  }
};

export default verifyToken;
