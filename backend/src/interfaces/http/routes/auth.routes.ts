import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

/**
 * Create Auth routes
 */
export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  // Middleware para loguear requests a auth
  router.use((req, res, next) => {
    console.log(`[AUTH] ${req.method} ${req.path}`);
    next();
  });

  /**
   * POST /auth/register
   * Register a new user
   */
  router.post('/register', (req: Request, res: Response) => {
    console.log('[AUTH-REGISTER] Handling register request');
    authController.register(req, res);
  });

  /**
   * POST /auth/login
   * Login with email and password
   */
  router.post('/login', (req: Request, res: Response) => {
    console.log('[AUTH-LOGIN] Handling login request');
    authController.login(req, res);
  });

  /**
   * POST /auth/logout
   * Logout (requires authentication)
   */
  router.post('/logout', verifyToken, (req: Request, res: Response) =>
    authController.logout(req, res)
  );

  /**
   * GET /auth/me
   * Get current user from token (requires authentication)
   */
  router.get('/me', verifyToken, (req: Request, res: Response) =>
    authController.getCurrentUser(req, res)
  );

  return router;
};
