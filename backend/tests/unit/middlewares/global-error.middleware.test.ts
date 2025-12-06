/**
 * Tests para el Global Error Handler Middleware
 * 
 * Estos tests verifican que:
 * 1. Los errores se formatean correctamente
 * 2. Los códigos HTTP son apropiados
 * 3. El stack trace solo aparece en desarrollo
 * 4. Los errores de PostgreSQL se manejan correctamente
 */

import { Request, Response, NextFunction } from 'express';
import { globalErrorHandler, notFoundHandler, asyncHandler } from '../../../src/interfaces/http/middlewares/global-error.middleware';
import { 
  AppError, 
  ValidationError, 
  NotFoundError, 
  UnauthorizedError 
} from '../../../src/shared/errors';

// Mock de Request, Response y NextFunction
const mockRequest = (overrides = {}): Partial<Request> => ({
  originalUrl: '/api/test',
  method: 'GET',
  body: {},
  headers: {},
  ...overrides,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.headersSent = false;
  return res;
};

const mockNext: NextFunction = jest.fn();

describe('Global Error Handler Middleware', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Set development mode for tests
    process.env.NODE_ENV = 'development';
  });

  describe('globalErrorHandler', () => {
    
    it('should handle AppError and return correct format', () => {
      const error = new ValidationError('Invalid data', { field: ['Error'] });
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.objectContaining({
            code: 'VALIDATION_ERROR',
            message: 'Invalid data',
            details: { field: ['Error'] },
          }),
        })
      );
    });

    it('should include stack trace in development', () => {
      process.env.NODE_ENV = 'development';
      const error = new NotFoundError('Resource');
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(error, req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stack: expect.any(String),
        })
      );
    });

    it('should NOT include stack trace in production', () => {
      process.env.NODE_ENV = 'production';
      const error = new NotFoundError('Resource');
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(error, req, res, mockNext);

      const jsonCall = (res.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall.stack).toBeUndefined();
    });

    it('should include timestamp, path and method', () => {
      const error = new UnauthorizedError();
      const req = mockRequest({ originalUrl: '/api/users', method: 'POST' }) as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(error, req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            path: '/api/users',
            method: 'POST',
            timestamp: expect.any(String),
          }),
        })
      );
    });

    it('should handle unknown errors as 500', () => {
      const error = new Error('Unknown error');
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(error, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'INTERNAL_SERVER_ERROR',
          }),
        })
      );
    });

    it('should handle PostgreSQL unique violation (23505)', () => {
      const pgError: any = new Error('duplicate key');
      pgError.code = '23505';
      pgError.detail = 'Key (email)=(test@example.com) already exists';
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(pgError, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'DUPLICATE_RESOURCE',
          }),
        })
      );
    });

    it('should handle JWT errors', () => {
      const jwtError: any = new Error('invalid token');
      jwtError.name = 'JsonWebTokenError';
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(jwtError, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'INVALID_TOKEN',
          }),
        })
      );
    });

    it('should handle expired JWT', () => {
      const expiredError: any = new Error('token expired');
      expiredError.name = 'TokenExpiredError';
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;

      globalErrorHandler(expiredError, req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'TOKEN_EXPIRED',
          }),
        })
      );
    });

    it('should not send response if headers already sent', () => {
      const error = new AppError('Test');
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;
      (res as any).headersSent = true;

      globalErrorHandler(error, req, res, mockNext);

      expect(res.status).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('notFoundHandler', () => {
    it('should create 404 error for unknown routes', () => {
      const req = mockRequest({ originalUrl: '/api/unknown', method: 'GET' }) as Request;
      const res = mockResponse() as Response;
      const next = jest.fn();

      notFoundHandler(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          code: 'ROUTE_NOT_FOUND',
          message: expect.stringContaining('/api/unknown'),
        })
      );
    });

    it('should include HTTP method in error message', () => {
      const req = mockRequest({ originalUrl: '/api/test', method: 'POST' }) as Request;
      const res = mockResponse() as Response;
      const next = jest.fn();

      notFoundHandler(req, res, next);

      const passedError = next.mock.calls[0][0];
      expect(passedError.message).toContain('POST');
    });
  });

  describe('asyncHandler', () => {
    it('should pass resolved value through', async () => {
      const mockHandler = jest.fn().mockResolvedValue({ data: 'test' });
      const wrapped = asyncHandler(mockHandler);
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;
      const next = jest.fn();

      await wrapped(req, res, next);

      expect(mockHandler).toHaveBeenCalledWith(req, res, next);
    });

    it('should catch and forward errors to next', async () => {
      const testError = new Error('Async error');
      const mockHandler = jest.fn().mockRejectedValue(testError);
      const wrapped = asyncHandler(mockHandler);
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;
      const next = jest.fn();

      await wrapped(req, res, next);

      expect(next).toHaveBeenCalledWith(testError);
    });

    it('should catch thrown AppError', async () => {
      const appError = new ValidationError('Test validation');
      const mockHandler = jest.fn().mockRejectedValue(appError);
      const wrapped = asyncHandler(mockHandler);
      
      const req = mockRequest() as Request;
      const res = mockResponse() as Response;
      const next = jest.fn();

      await wrapped(req, res, next);

      expect(next).toHaveBeenCalledWith(appError);
    });
  });
});
