import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../../../shared/errors';

/**
 * Middleware para verificar Roles (RBAC)
 * 
 * Los errores se propagan al globalErrorHandler para formato consistente.
 * 
 * @param allowedRoles Array de roles permitidos (ej: ['ADMIN', 'DOCTOR'])
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // 1. Obtenemos el usuario que el 'authMiddleware' debió haber inyectado antes
    const user = (req as any).user;

    // Si por alguna razón no hay usuario (falló el auth middleware), denegamos
    if (!user) {
      return next(new UnauthorizedError('Usuario no identificado'));
    }

    // 2. Verificamos si el rol del usuario está en la lista de permitidos
    if (!allowedRoles.includes(user.role)) {
      return next(new ForbiddenError(
        `Acceso prohibido. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}`
      ));
    }

    // 3. Si todo está bien, pase usted
    next();
  };
};