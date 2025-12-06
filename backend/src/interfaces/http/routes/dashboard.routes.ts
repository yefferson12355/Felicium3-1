import { Router, Request, Response, NextFunction } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { verifyToken } from '../../../infrastructure/auth/JwtMiddleware';
import { asyncHandler } from '../middlewares/global-error.middleware';

/**
 * Dashboard Routes
 * 
 * GET /api/dashboard/stats - Estadísticas generales
 * GET /api/dashboard/stats/appointments - Estadísticas de citas
 * GET /api/dashboard/stats/revenue - Estadísticas de ingresos
 * GET /api/dashboard/stats/patients - Estadísticas de pacientes
 */

export const createDashboardRoutes = (dashboardController: DashboardController): Router => {
  const router = Router();

  /**
   * GET /stats - Estadísticas generales del dashboard
   */
  router.get('/stats', verifyToken, asyncHandler((req: Request, res: Response, next: NextFunction) =>
    dashboardController.getStats(req, res, next)
  ));

  /**
   * GET /stats/appointments - Estadísticas de citas
   */
  router.get('/stats/appointments', verifyToken, asyncHandler((req: Request, res: Response, next: NextFunction) =>
    dashboardController.getAppointmentStats(req, res, next)
  ));

  /**
   * GET /stats/revenue - Estadísticas de ingresos
   */
  router.get('/stats/revenue', verifyToken, asyncHandler((req: Request, res: Response, next: NextFunction) =>
    dashboardController.getRevenueStats(req, res, next)
  ));

  /**
   * GET /stats/patients - Estadísticas de pacientes
   */
  router.get('/stats/patients', verifyToken, asyncHandler((req: Request, res: Response, next: NextFunction) =>
    dashboardController.getPatientStats(req, res, next)
  ));

  return router;
};

export default createDashboardRoutes;
