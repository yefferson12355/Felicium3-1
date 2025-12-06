import { Request, Response, NextFunction } from 'express';
import { getCorsConfig, isOriginAllowed } from '../../../infrastructure/config/cors.config';

/**
 * Middleware de CORS seguro
 * 
 * A diferencia de usar cors({ origin: '*' }), este middleware:
 * 1. Valida el origen de cada petición
 * 2. Solo permite orígenes configurados explícitamente
 * 3. Maneja correctamente las peticiones preflight (OPTIONS)
 * 4. Soporta credenciales de forma segura
 */
export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;
  const config = getCorsConfig();
  
  // Verificar si el origen está permitido
  if (isOriginAllowed(origin)) {
    // Solo establecer el header si el origen está permitido
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Permitir credenciales (cookies, auth headers)
    res.setHeader('Access-Control-Allow-Credentials', String(config.credentials));
    
    // Headers expuestos al cliente
    if (config.exposedHeaders.length > 0) {
      res.setHeader('Access-Control-Expose-Headers', config.exposedHeaders.join(', '));
    }
  }
  
  // Manejar peticiones preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    if (isOriginAllowed(origin)) {
      // Métodos permitidos
      res.setHeader('Access-Control-Allow-Methods', config.allowedMethods.join(', '));
      
      // Headers permitidos
      res.setHeader('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
      
      // Tiempo de cache para preflight
      res.setHeader('Access-Control-Max-Age', String(config.maxAge));
      
      // Responder exitosamente al preflight
      res.status(204).end();
      return;
    } else {
      // Origen no permitido - rechazar preflight
      console.warn(`⚠️ [CORS] Origen rechazado: ${origin}`);
      res.status(403).json({ 
        error: 'CORS_ERROR',
        message: 'Origen no permitido' 
      });
      return;
    }
  }
  
  // Para otras peticiones, continuar si el origen es válido o no hay origen
  if (origin && !isOriginAllowed(origin)) {
    console.warn(`⚠️ [CORS] Petición rechazada desde origen no permitido: ${origin}`);
    res.status(403).json({ 
      error: 'CORS_ERROR',
      message: 'Origen no permitido' 
    });
    return;
  }
  
  next();
};

/**
 * Middleware de logging para CORS (solo en desarrollo)
 * Útil para debuggear problemas de CORS
 */
export const corsDebugMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (process.env.NODE_ENV === 'development' && process.env.DEBUG_CORS === 'true') {
    console.log(`🔍 [CORS Debug] ${req.method} ${req.path}`);
    console.log(`   Origin: ${req.headers.origin || 'No origin'}`);
    console.log(`   Allowed: ${isOriginAllowed(req.headers.origin)}`);
  }
  next();
};
