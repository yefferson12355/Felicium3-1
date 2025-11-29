import { Request, Response, NextFunction } from 'express';
import { verifyToken as verifyTokenJwt } from './JwtService';

/**
 * JWT Middleware - Verifica el token JWT en el header Authorization
 * 
 * Uso: router.get('/protected', verifyToken, controller.method)
 */

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ No authorization header provided');
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('❌ Invalid authorization header format');
      res.status(401).json({ error: 'Invalid token format' });
      return;
    }

    const token = parts[1];

    // Verify token
    const decoded = verifyTokenJwt(token);
    
    // Add user info to request
    (req as any).user = decoded;
    
    console.log('✅ Token verified for user:', decoded.id);
    next();
  } catch (error: any) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default verifyToken;
