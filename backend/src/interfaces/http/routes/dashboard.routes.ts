import { Router, Request, Response } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { verifyToken } from '../../../infrastructure/auth/JwtMiddleware';

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
  router.get('/stats', verifyToken, (req: Request, res: Response) =>
    dashboardController.getStats(req, res)
  );

  /**
   * GET /stats/appointments - Estadísticas de citas
   */
  router.get('/stats/appointments', verifyToken, (req: Request, res: Response) =>
    dashboardController.getAppointmentStats(req, res)
  );

  /**
   * GET /stats/revenue - Estadísticas de ingresos
   */
  router.get('/stats/revenue', verifyToken, (req: Request, res: Response) =>
    dashboardController.getRevenueStats(req, res)
  );

  /**
   * GET /stats/patients - Estadísticas de pacientes
   */
  router.get('/stats/patients', verifyToken, (req: Request, res: Response) =>
    dashboardController.getPatientStats(req, res)
  );

  return router;
};

export default createDashboardRoutes;
