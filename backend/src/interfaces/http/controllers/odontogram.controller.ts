import { Request, Response } from 'express';
import {
  CreateOdontogramUseCase,
  GetOdontogramByIdUseCase,
  GetOdontogramByPatientUseCase,
  UpdateOdontogramUseCase,
  DeleteOdontogramUseCase,
} from '../../../core/application/odontogram';
import { OdontogramMapper } from '../mappers/OdontogramMapper';
import { CreateOdontogramDTO } from '../dtos/odontogram/CreateOdontogramDTO';
import { UpdateOdontogramDTO } from '../dtos/odontogram/UpdateOdontogramDTO';

/**
 * OdontogramController
 * 
 * Controlador que maneja todos los endpoints HTTP del odontograma
 * 
 * Responsabilidades:
 * - Recibir requests HTTP
 * - Validar datos de entrada
 * - Llamar a use cases
 * - Devolver respuestas formateadas
 * 
 * Endpoints:
 * POST   /api/odontogram              - Crear nuevo odontograma
 * GET    /api/odontogram/:id          - Obtener por ID
 * GET    /api/odontogram/patient/:id  - Obtener por paciente
 * PUT    /api/odontogram/:id          - Actualizar estado de diente
 * DELETE /api/odontogram/:id          - Eliminar odontograma
 */
export class OdontogramController {
  constructor(
    private createOdontogramUseCase: CreateOdontogramUseCase,
    private getOdontogramByIdUseCase: GetOdontogramByIdUseCase,
    private getOdontogramByPatientUseCase: GetOdontogramByPatientUseCase,
    private updateOdontogramUseCase: UpdateOdontogramUseCase,
    private deleteOdontogramUseCase: DeleteOdontogramUseCase
  ) {}

  /**
   * POST /api/odontogram
   * Crear nuevo odontograma para un paciente
   */
  async createOdontogram(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateOdontogramDTO = req.body;

      // Validación básica
      if (!dto.patientId || !dto.patientAge || !dto.dentureType) {
        res.status(400).json({
          success: false,
          error: 'Campos requeridos: patientId, patientAge, dentureType',
        });
        return;
      }

      // Ejecutar use case
      const odontogram = await this.createOdontogramUseCase.execute({
        patientId: dto.patientId,
        patientAge: dto.patientAge,
        dentureType: dto.dentureType,
      });

      // Mapear a DTO y responder
      const responseDto = OdontogramMapper.toPersistence(odontogram);

      res.status(201).json({
        success: true,
        data: responseDto,
        message: 'Odontograma creado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Error al crear odontograma',
      });
    }
  }

  /**
   * GET /api/odontogram/:id
   * Obtener un odontograma por su ID
   */
  async getOdontogramById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID del odontograma requerido',
        });
        return;
      }

      // Ejecutar use case
      const odontogram = await this.getOdontogramByIdUseCase.execute(id);

      // Mapear y responder
      const responseDto = OdontogramMapper.toPersistence(odontogram);

      res.status(200).json({
        success: true,
        data: responseDto,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message || 'Odontograma no encontrado',
      });
    }
  }

  /**
   * GET /api/odontogram/patient/:patientId
   * Obtener el odontograma de un paciente específico
   */
  async getOdontogramByPatient(req: Request, res: Response): Promise<void> {
    try {
      const { patientId } = req.params;

      if (!patientId) {
        res.status(400).json({
          success: false,
          error: 'ID del paciente requerido',
        });
        return;
      }

      // Ejecutar use case
      const odontogram = await this.getOdontogramByPatientUseCase.execute(patientId);

      // Mapear y responder
      const responseDto = OdontogramMapper.toPersistence(odontogram);

      res.status(200).json({
        success: true,
        data: responseDto,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message || 'Odontograma del paciente no encontrado',
      });
    }
  }

  /**
   * PUT /api/odontogram/:id
   * Actualizar un diente en el odontograma
   * 
   * Body:
   * {
   *   "toothNumber": 11,
   *   "newState": "CARIES",
   *   "notes": "Caries detectada en revisión"
   * }
   */
  async updateOdontogram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateOdontogramDTO = req.body;

      // Validación
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID del odontograma requerido',
        });
        return;
      }

      if (!dto.toothNumber || !dto.newState) {
        res.status(400).json({
          success: false,
          error: 'Campos requeridos: toothNumber, newState',
        });
        return;
      }

      // Ejecutar use case
      const updatedOdontogram = await this.updateOdontogramUseCase.execute({
        odontogramId: id,
        toothNumber: dto.toothNumber,
        newState: dto.newState,
        notes: dto.notes,
      });

      // Mapear y responder
      const responseDto = OdontogramMapper.toPersistence(updatedOdontogram);

      res.status(200).json({
        success: true,
        data: responseDto,
        message: `Diente ${dto.toothNumber} actualizado a ${dto.newState}`,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Error al actualizar odontograma',
      });
    }
  }

  /**
   * DELETE /api/odontogram/:id
   * Eliminar un odontograma
   */
  async deleteOdontogram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'ID del odontograma requerido',
        });
        return;
      }

      // Ejecutar use case
      await this.deleteOdontogramUseCase.execute(id);

      res.status(200).json({
        success: true,
        message: `Odontograma ${id} eliminado exitosamente`,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        error: error.message || 'Error al eliminar odontograma',
      });
    }
  }
}
