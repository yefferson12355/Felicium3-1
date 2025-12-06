import { Request, Response, NextFunction } from 'express';
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
import { 
  ValidationError, 
  OdontogramNotFoundError,
  InvalidInputError 
} from '../../../shared/errors';

/**
 * OdontogramController
 * 
 * Controlador que maneja todos los endpoints HTTP del odontograma.
 * Sin try/catch - los errores se propagan al globalErrorHandler.
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
  async createOdontogram(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto: CreateOdontogramDTO = req.body;

    // Validación
    if (!dto.patientId || !dto.patientAge || !dto.dentureType) {
      throw new ValidationError('Campos requeridos faltantes', {
        patientId: !dto.patientId ? ['El ID del paciente es requerido'] : [],
        patientAge: !dto.patientAge ? ['La edad del paciente es requerida'] : [],
        dentureType: !dto.dentureType ? ['El tipo de dentadura es requerido'] : [],
      });
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
  }

  /**
   * GET /api/odontogram/:id
   * Obtener un odontograma por su ID
   */
  async getOdontogramById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!id) {
      throw new InvalidInputError('id', 'El ID del odontograma es requerido');
    }

    // Ejecutar use case
    const odontogram = await this.getOdontogramByIdUseCase.execute(id);

    if (!odontogram) {
      throw new OdontogramNotFoundError(id);
    }

    // Mapear y responder
    const responseDto = OdontogramMapper.toPersistence(odontogram);

    res.status(200).json({
      success: true,
      data: responseDto,
    });
  }

  /**
   * GET /api/odontogram/patient/:patientId
   * Obtener el odontograma de un paciente específico
   */
  async getOdontogramByPatient(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { patientId } = req.params;

    if (!patientId) {
      throw new InvalidInputError('patientId', 'El ID del paciente es requerido');
    }

    // Ejecutar use case
    const odontogram = await this.getOdontogramByPatientUseCase.execute(patientId);

    if (!odontogram) {
      throw new OdontogramNotFoundError(`paciente-${patientId}`);
    }

    // Mapear y responder
    const responseDto = OdontogramMapper.toPersistence(odontogram);

    res.status(200).json({
      success: true,
      data: responseDto,
    });
  }

  /**
   * PUT /api/odontogram/:id
   * Actualizar un diente en el odontograma
   */
  async updateOdontogram(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const dto: UpdateOdontogramDTO = req.body;

    // Validación
    if (!id) {
      throw new InvalidInputError('id', 'El ID del odontograma es requerido');
    }

    if (!dto.toothNumber || !dto.newState) {
      throw new ValidationError('Campos requeridos faltantes', {
        toothNumber: !dto.toothNumber ? ['El número de diente es requerido'] : [],
        newState: !dto.newState ? ['El nuevo estado es requerido'] : [],
      });
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
  }

  /**
   * DELETE /api/odontogram/:id
   * Eliminar un odontograma
   */
  async deleteOdontogram(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    if (!id) {
      throw new InvalidInputError('id', 'El ID del odontograma es requerido');
    }

    // Ejecutar use case
    await this.deleteOdontogramUseCase.execute(id);

    res.status(200).json({
      success: true,
      message: `Odontograma ${id} eliminado exitosamente`,
    });
  }
}
