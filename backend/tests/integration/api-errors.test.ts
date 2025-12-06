/**
 * Tests de Integración para API Endpoints
 * 
 * Estos tests verifican el flujo completo de la API:
 * 1. Validación de entrada
 * 2. Respuestas correctas
 * 3. Manejo de errores unificado
 * 
 * Nota: Estos son tests de integración "light" que no requieren
 * una base de datos real, usando una app Express mínima.
 */

import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { 
  globalErrorHandler, 
  notFoundHandler 
} from '../../src/interfaces/http/middlewares/global-error.middleware';
import { 
  UnauthorizedError, 
  NotFoundError,
  ValidationError,
  ForbiddenError 
} from '../../src/shared/errors';

// Crear una app de prueba mínima
const createTestApp = (): Application => {
  const app = express();
  app.use(express.json());
  
  // Ruta de prueba para validación
  app.post('/api/test/validation', (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Campos requeridos faltantes',
          timestamp: new Date().toISOString(),
          path: req.path,
          method: req.method,
        },
      });
    }
    
    res.status(200).json({ success: true });
  });

  // Ruta que simula error de autenticación
  app.get('/api/test/protected', (req: Request, res: Response, next: NextFunction) => {
    next(new UnauthorizedError('Token no proporcionado'));
  });

  // Ruta que simula error 404
  app.get('/api/test/notfound', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Usuario', '123'));
  });

  // Ruta que simula error de servidor
  app.get('/api/test/servererror', (req: Request, res: Response, next: NextFunction) => {
    next(new Error('Database connection failed'));
  });

  // Ruta que simula error de validación con AppError
  app.post('/api/test/validate-dto', (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      next(new ValidationError('El email es requerido'));
      return;
    }
    res.status(200).json({ success: true });
  });

  // Ruta que simula error de permisos
  app.get('/api/test/forbidden', (req: Request, res: Response, next: NextFunction) => {
    next(new ForbiddenError('No tienes permisos para acceder a este recurso'));
  });

  app.use(notFoundHandler);
  app.use(globalErrorHandler);
  
  return app;
};

describe('API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createTestApp();
    process.env.NODE_ENV = 'test';
  });

  describe('Error Response Format', () => {
    
    it('should return 400 for validation errors with correct format', async () => {
      const response = await request(app)
        .post('/api/test/validation')
        .send({ email: '' })
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'VALIDATION_ERROR',
        }),
      });
    });

    it('should return 401 for unauthorized with correct format', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'UNAUTHORIZED',
          message: 'Token no proporcionado',
        }),
      });
    });

    it('should return 404 for not found resources', async () => {
      const response = await request(app)
        .get('/api/test/notfound')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'NOT_FOUND',
        }),
      });
      expect(response.body.error.message).toContain('Usuario');
      expect(response.body.error.message).toContain('123');
    });

    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/ruta-que-no-existe')
        .expect(404);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'ROUTE_NOT_FOUND',
        }),
      });
    });

    it('should return 500 for internal server errors', async () => {
      const response = await request(app)
        .get('/api/test/servererror')
        .expect(500);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'INTERNAL_SERVER_ERROR',
        }),
      });
    });

    it('should return 400 for ValidationError from AppError', async () => {
      const response = await request(app)
        .post('/api/test/validate-dto')
        .send({})
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'VALIDATION_ERROR',
          message: 'El email es requerido',
        }),
      });
    });

    it('should return 403 for forbidden errors', async () => {
      const response = await request(app)
        .get('/api/test/forbidden')
        .expect(403);

      expect(response.body).toMatchObject({
        success: false,
        error: expect.objectContaining({
          code: 'FORBIDDEN',
        }),
      });
    });
  });

  describe('Response Metadata', () => {
    
    it('should include timestamp in error response', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .expect(401);

      expect(response.body.error.timestamp).toBeDefined();
      // Verificar que es una fecha ISO válida
      expect(new Date(response.body.error.timestamp).toISOString()).toBe(
        response.body.error.timestamp
      );
    });

    it('should include path in error response', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .expect(401);

      expect(response.body.error.path).toBe('/api/test/protected');
    });

    it('should include HTTP method in error response', async () => {
      const response = await request(app)
        .post('/api/test/validation')
        .send({})
        .expect(400);

      expect(response.body.error.method).toBe('POST');
    });
  });

  describe('Content-Type', () => {
    
    it('should return JSON content type', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .expect('Content-Type', /json/);

      expect(response.body).toBeDefined();
    });
  });

  describe('Success Responses', () => {
    
    it('should return 200 for valid requests', async () => {
      const response = await request(app)
        .post('/api/test/validation')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
      });
    });
  });
});
