import 'dotenv/config';

/**
 * Configuración de CORS (Cross-Origin Resource Sharing)
 * 
 * CORS controla qué dominios pueden hacer peticiones a tu API.
 * Una configuración insegura (origin: '*') permite que CUALQUIER sitio
 * acceda a tu API, lo cual es un riesgo de seguridad.
 */

export interface CorsConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

/**
 * Obtiene los orígenes permitidos según el entorno
 */
const getAllowedOrigins = (): string[] => {
  const env = process.env.NODE_ENV || 'development';
  
  // Si hay una variable de entorno específica, la usamos
  if (process.env.CORS_ALLOWED_ORIGINS) {
    return process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  }
  
  // Orígenes por defecto según el entorno
  switch (env) {
    case 'production':
      // En producción, SOLO permitir dominios específicos
      return [
        process.env.FRONTEND_URL || 'https://tu-dominio.com',
        // Agregar otros dominios de producción si es necesario
      ].filter(Boolean);
      
    case 'staging':
      return [
        'https://staging.tu-dominio.com',
        'https://test.tu-dominio.com',
      ];
      
    case 'development':
    default:
      // En desarrollo, permitir localhost en diferentes puertos
      return [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        // Docker internal
        'http://frontend:3000',
      ];
  }
};

/**
 * Configuración completa de CORS
 */
export const getCorsConfig = (): CorsConfig => {
  return {
    // Orígenes permitidos (dominios que pueden hacer peticiones)
    allowedOrigins: getAllowedOrigins(),
    
    // Métodos HTTP permitidos
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    
    // Headers que el cliente puede enviar
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    
    // Headers que el cliente puede leer de la respuesta
    exposedHeaders: [
      'X-Total-Count',
      'X-Page-Count',
    ],
    
    // Permitir cookies y credenciales
    credentials: true,
    
    // Tiempo en segundos que el navegador cachea la respuesta preflight
    maxAge: 86400, // 24 horas
  };
};

/**
 * Verifica si un origen está permitido
 */
export const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) {
    // Peticiones sin origen (como Postman, curl, o mismo servidor)
    // En producción podrías querer rechazarlas
    return process.env.NODE_ENV !== 'production';
  }
  
  const config = getCorsConfig();
  return config.allowedOrigins.includes(origin);
};

/**
 * Obtiene el origen permitido para la respuesta
 * Retorna el origen si está permitido, o null si no
 */
export const getOriginForResponse = (origin: string | undefined): string | null => {
  if (isOriginAllowed(origin)) {
    return origin || null;
  }
  return null;
};
