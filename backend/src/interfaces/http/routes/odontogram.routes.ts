import { Router, Request, Response, NextFunction } from 'express';
import { OdontogramController } from '../controllers/odontogram.controller';
import { asyncHandler } from '../middlewares/global-error.middleware';

/**
 * OdontogramRoutes
 * 
 * Define los endpoints HTTP para el módulo de odontogramas
 * 
 * Endpoints:
 * POST   /api/odontogram              - Crear nuevo odontograma
 * GET    /api/odontogram/:id          - Obtener por ID
 * GET    /api/odontogram/patient/:id  - Obtener por paciente (IMPORTANTE: ir antes de /:id)
 * PUT    /api/odontogram/:id          - Actualizar diente
 * DELETE /api/odontogram/:id          - Eliminar odontograma
 */
export function createOdontogramRoutes(controller: OdontogramController): Router {
  const router = Router();

  /**
   * POST /api/odontogram
   * Crear nuevo odontograma
   */
  router.post('/', asyncHandler((req: Request, res: Response, next: NextFunction) =>
    controller.createOdontogram(req, res, next)
  ));

  /**
   * GET /api/odontogram/patient/:patientId
   * 
   * IMPORTANTE: Esta ruta DEBE ir antes de /:id
   * porque si no, "/patient/123" sería interpretado como "/:id" con id="patient"
   */
  router.get('/patient/:patientId', asyncHandler((req: Request, res: Response, next: NextFunction) =>
    controller.getOdontogramByPatient(req, res, next)
  ));

  /**
   * GET /api/odontogram/:id
   * Obtener odontograma por su ID
   */
  router.get('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) =>
    controller.getOdontogramById(req, res, next)
  ));

  /**
   * PUT /api/odontogram/:id
   * Actualizar un diente en el odontograma
   */
  router.put('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) =>
    controller.updateOdontogram(req, res, next)
  ));

  /**
   * DELETE /api/odontogram/:id
   * Eliminar odontograma
   */
  router.delete('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) =>
    controller.deleteOdontogram(req, res, next)
  ));

  return router;
}
