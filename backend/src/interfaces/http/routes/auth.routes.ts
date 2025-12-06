import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validation.middleware';
import { asyncHandler } from '../middlewares/global-error.middleware';
import { LoginDTO } from '../dtos/auth/LoginDTO';
import { RegisterDTO } from '../dtos/auth/RegisterDTO';

/**
 * Create Auth routes
 */
export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  /**
   * POST /auth/register
   * Register a new user
   * Validación: RegisterDTO verifica email, password fuerte, nombres
   */
  router.post('/register', 
    validateDto(RegisterDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      authController.register(req, res, next)
    )
  );

  /**
   * POST /auth/login
   * Login with email and password
   * Validación: LoginDTO verifica email y password
   */
  router.post('/login', 
    validateDto(LoginDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      authController.login(req, res, next)
    )
  );

  /**
   * POST /auth/logout
   * Logout (requires authentication)
   */
  router.post('/logout', 
    verifyToken, 
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      authController.logout(req, res, next)
    )
  );

  /**
   * GET /auth/me
   * Get current user from token (requires authentication)
   */
  router.get('/me', 
    verifyToken, 
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      authController.getCurrentUser(req, res, next)
    )
  );

  return router;
};
