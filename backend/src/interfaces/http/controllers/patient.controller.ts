import { Request, Response } from 'express';
// 1. Importar TODOS los Casos de Uso
import { CreatePatientUseCase } from '../../../core/application/patient/CreatePatientUseCase';
import { GetPatientByIdUseCase } from '../../../core/application/patient/GetPatientByIdUseCase';
import { ListPatientUseCase } from '../../../core/application/patient/ListPatientUseCase';

import { CreatePatientDTO } from '../dtos/patient/CreatePatientDTO';
import { PatientMapper } from '../mappers/PatientMapper';
import { ValidationError, NotFoundError } from '../../../shared/errors';
import { PatientReceptionistResponseDTO } from '../dtos/patient/PatientResponseDTO';

/**
 * @class PatientController
 * @description Recepcionista que maneja las peticiones HTTP de Pacientes.
 */
export class PatientController {
  
  // 2. Propiedades para los Casos de Uso
  private createPatientUseCase: CreatePatientUseCase;
  private getPatientByIdUseCase: GetPatientByIdUseCase;
  private listPatientUseCase: ListPatientUseCase;
  
  // 3. Constructor con Inyección de Dependencias
  constructor(
    createPatientUseCase: CreatePatientUseCase,
    getPatientByIdUseCase: GetPatientByIdUseCase,
    listPatientUseCase: ListPatientUseCase
  ) {
    this.createPatientUseCase = createPatientUseCase;
    this.getPatientByIdUseCase = getPatientByIdUseCase;
    this.listPatientUseCase = listPatientUseCase;
  }

  /**
   * MÉTODO: CREAR PACIENTE (POST /)
   * Incluye logs para depuración.
   */
  public async crearPaciente(req: Request, res: Response) {
    console.log("📍 1. CONTROLADOR: Petición recibida en crearPaciente");
    
    try {
      // 1. Recibir el formulario
      const inputData: CreatePatientDTO = req.body; 
      console.log("📍 2. CONTROLADOR: Body recibido:", JSON.stringify(inputData));

      console.log("📍 3. CONTROLADOR: Llamando al Director (CreatePatientUseCase)...");
      
      // 2. Llamar al Director
      const pacienteCreado = await this.createPatientUseCase.ejecutar(inputData);

      console.log("📍 4. CONTROLADOR: ¡El Director respondió! ID Paciente:", pacienteCreado.id);

      // 3. Mappear la respuesta
      const userRole = (req as any).user?.role; 
      const responseDTO = PatientMapper.toDTO(pacienteCreado, userRole);

      // 4. Responder
      return res.status(201).json({
        success: true,
        data: responseDTO,
        message: 'Paciente creado exitosamente.'
      });

    } catch (error: any) {
      console.error("❌ ERROR EN CONTROLADOR:", error);
      
      if (error instanceof ValidationError) {
         return res.status(400).json({ message: error.message });
      }
      if (error instanceof NotFoundError) {
         return res.status(404).json({ message: error.message });
      }
      // Error genérico (probablemente DB)
      return res.status(500).json({ message: 'Error interno: ' + error.message });
    }
  }

  /**
   * MÉTODO: OBTENER POR ID (GET /:id)
   */
  public async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // 1. Llamar al Director
      const paciente = await this.getPatientByIdUseCase.ejecutar(Number(id));
      
      // 2. Mappear la respuesta según Rol
      const userRole = (req as any).user?.role || 'RECEPTIONIST'; 
      const response = PatientMapper.toDTO(paciente, userRole);

      return res.status(200).json(response);

    } catch (error: any) {
      if (error instanceof NotFoundError) {
          return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error al buscar paciente' });
    }
  }

  /**
   * MÉTODO: LISTAR TODOS (GET /)
   */
  public async listPatients(req: Request, res: Response) {
    try {
      // 1. Llamar al Director
      const pacientes = await this.listPatientUseCase.ejecutar();
      
      const userRole = (req as any).user?.role || 'RECEPTIONIST';
      
      // 2. Mappear la lista completa
      const response = pacientes.map(p => PatientMapper.toDTO(p, userRole));

      return res.status(200).json(response);

    } catch (error) {
      return res.status(500).json({ message: 'Error al listar pacientes' });
    }
  }
}