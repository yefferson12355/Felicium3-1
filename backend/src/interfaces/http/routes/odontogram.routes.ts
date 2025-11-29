import { Router } from 'express';
import { OdontogramController } from '../controllers/odontogram.controller';

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
   * 
   * Body:
   * {
   *   "patientId": "patient-123",
   *   "patientAge": 35,
   *   "dentureType": "PERMANENT"
   * }
   */
  router.post('/', (req, res) => controller.createOdontogram(req, res));

  /**
   * GET /api/odontogram/patient/:patientId
   * 
   * IMPORTANTE: Esta ruta DEBE ir antes de /:id
   * porque si no, "/patient/123" sería interpretado como "/:id" con id="patient"
   */
  router.get('/patient/:patientId', (req, res) =>
    controller.getOdontogramByPatient(req, res)
  );

  /**
   * GET /api/odontogram/:id
   * Obtener odontograma por su ID
   */
  router.get('/:id', (req, res) => controller.getOdontogramById(req, res));

  /**
   * PUT /api/odontogram/:id
   * Actualizar un diente en el odontograma
   * 
   * Body:
   * {
   *   "toothNumber": 11,
   *   "newState": "CARIES",
   *   "notes": "Caries detectada"
   * }
   */
  router.put('/:id', (req, res) => controller.updateOdontogram(req, res));

  /**
   * DELETE /api/odontogram/:id
   * Eliminar odontograma
   */
  router.delete('/:id', (req, res) => controller.deleteOdontogram(req, res));

  return router;
}
