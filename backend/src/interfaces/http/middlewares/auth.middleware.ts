import { verifyToken } from '../../../infrastructure/auth/JwtService';
import { Request, Response, NextFunction } from 'express';
// (Asume que 'verifyToken' ya está importado desde infrastructure/auth/JwtService)

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Se requiere autenticación.' });
  }

  try {
    // 1. Verificar y decodificar el token usando el servicio de Infraestructura
    const decodedUser = verifyToken(token); 
    
    // 2. Adjuntar el usuario decodificado a la petición
    (req as any).user = decodedUser; 

    // 3. Continuar con la siguiente función (Controller o otro Middleware)
    next();
  } catch (error) {
    // Si la verificación falla (token expirado o inválido)
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};