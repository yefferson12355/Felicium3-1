import { Request, Response, NextFunction } from 'express';
// 1. Importar TODOS los Casos de Uso
import { CreatePatientUseCase } from '../../../core/application/patient/CreatePatientUseCase';
import { GetPatientByIdUseCase } from '../../../core/application/patient/GetPatientByIdUseCase';
import { ListPatientUseCase } from '../../../core/application/patient/ListPatientUseCase';
import { UpdatePatientUseCase } from '../../../core/application/patient/UpdatePatientUseCase';
import { DeletePatientUseCase } from '../../../core/application/patient/DeletePatientUseCase';

import { CreatePatientDTO } from '../dtos/patient/CreatePatientDTO';
import { UpdatePatientDTO } from '../dtos/patient/UpdatePatientDTO';
import { PatientMapper } from '../mappers/PatientMapper';
import { 
  PatientNotFoundError, 
  ValidationError as AppValidationError 
} from '../../../shared/errors';
import { PatientReceptionistResponseDTO } from '../dtos/patient/PatientResponseDTO';

export class PatientController {
  
  // 2. Definir las propiedades para los Casos de Uso
  private createPatientUseCase: CreatePatientUseCase;
  private getPatientByIdUseCase: GetPatientByIdUseCase;
  private listPatientUseCase: ListPatientUseCase;
  private updatePatientUseCase: UpdatePatientUseCase;
  private deletePatientUseCase: DeletePatientUseCase;
  
  constructor(
    createPatientUseCase: CreatePatientUseCase,
    getPatientByIdUseCase: GetPatientByIdUseCase,
    listPatientUseCase: ListPatientUseCase,
    updatePatientUseCase: UpdatePatientUseCase,
    deletePatientUseCase: DeletePatientUseCase
  ) {
    this.createPatientUseCase = createPatientUseCase;
    this.getPatientByIdUseCase = getPatientByIdUseCase;
    this.listPatientUseCase = listPatientUseCase;
    this.updatePatientUseCase = updatePatientUseCase;
    this.deletePatientUseCase = deletePatientUseCase;
  }

  /**
   * POST /patients - Crear nuevo paciente
   * Los errores son manejados automáticamente por asyncHandler + globalErrorHandler
   */
  public async crearPaciente(req: Request, res: Response, next: NextFunction): Promise<void> {
    // 1. Mapear los campos del request a los campos del DTO
    const inputData: CreatePatientDTO = {
      dni: req.body.dni || req.body.documentNumber || '',
      nombre: req.body.firstName || req.body.nombre || '',
      apellido: req.body.lastName || req.body.apellido || '',
      email: req.body.email || '',
      fechaNacimiento: req.body.dateBirth || req.body.fechaNacimiento || '',
      firmaDigital: req.body.firmaDigital || '',
      telefono: req.body.phone || req.body.telefono,
      nombreApoderado: req.body.nombreApoderado,
      direccion: req.body.address || req.body.direccion,
      observaciones: req.body.observations || req.body.observaciones,
      odontograma: req.body.odontograma || ''
    };

    // 2. Llama al Director (Caso de Uso)
    const pacienteCreado = await this.createPatientUseCase.ejecutar(inputData);

    // 3. Determinar el Rol del Usuario
    const userRole = (req as any).user?.role;

    // 4. Mapear la respuesta según el rol
    const responseDTO: PatientReceptionistResponseDTO = PatientMapper.toDTO(pacienteCreado, userRole);

    // 5. Enviar respuesta exitosa
    res.status(201).json({
      success: true,
      data: responseDTO,
      message: 'Paciente creado exitosamente.'
    });
  }

  /**
   * GET /patients/:id - Obtener paciente por ID
   */
  public async getPatientById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    // Llamar al Director de Get (lanza error si no encuentra)
    const paciente = await this.getPatientByIdUseCase.ejecutar(id);
    
    if (!paciente) {
      throw new PatientNotFoundError(id);
    }

    // Mappear respuesta según rol
    const userRole = (req as any).user?.role || 'RECEPTIONIST'; 
    const response = PatientMapper.toDTO(paciente, userRole);

    res.status(200).json({
      success: true,
      data: response
    });
  }

  /**
   * GET /patients - Listar todos los pacientes
   */
  public async listPatients(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Llamar al Director de List
    const pacientes = await this.listPatientUseCase.ejecutar();
    
    const userRole = (req as any).user?.role || 'RECEPTIONIST';
    // Mappear la lista completa
    const response = pacientes.map(p => PatientMapper.toDTO(p, userRole));

    res.status(200).json({
      success: true,
      data: response,
      count: response.length
    });
  }

  /**
   * PUT /patients/:id - Actualizar paciente existente
   */
  public async updatePatient(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    // Mapear campos del request al DTO
    const updateData: UpdatePatientDTO = {
      nombre: req.body.firstName || req.body.nombre,
      apellido: req.body.lastName || req.body.apellido,
      email: req.body.email,
      telefono: req.body.phone || req.body.telefono,
      fechaNacimiento: req.body.dateBirth || req.body.fechaNacimiento,
      firmaDigital: req.body.firmaDigital,
      odontograma: req.body.odontograma,
      nombreApoderado: req.body.nombreApoderado,
      direccion: req.body.address || req.body.direccion,
      observaciones: req.body.observations || req.body.observaciones,
      estaActivo: req.body.isActive ?? req.body.estaActivo
    };

    // Llamar al Use Case
    const pacienteActualizado = await this.updatePatientUseCase.ejecutar(id, updateData);

    // Mapear respuesta según rol
    const userRole = (req as any).user?.role || 'RECEPTIONIST';
    const response = PatientMapper.toDTO(pacienteActualizado, userRole);

    res.status(200).json({
      success: true,
      data: response,
      message: 'Paciente actualizado exitosamente.'
    });
  }

  /**
   * DELETE /patients/:id - Eliminar (desactivar) paciente
   */
  public async deletePatient(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    // Llamar al Use Case de eliminación
    await this.deletePatientUseCase.ejecutar(id);

    res.status(200).json({
      success: true,
      message: 'Paciente eliminado exitosamente.'
    });
  }
}