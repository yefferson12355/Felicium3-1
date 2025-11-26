import { Request, Response } from 'express';
// 1. Importar TODOS los Casos de Uso
import { CreatePatientUseCase } from '../../../core/application/patient/CreatePatientUseCase';
import { GetPatientByIdUseCase } from '../../../core/application/patient/GetPatientByIdUseCase'; // <--- NUEVO
import { ListPatientUseCase } from '../../../core/application/patient/ListPatientUseCase';       // <--- NUEVO

import { CreatePatientDTO } from '../dtos/patient/CreatePatientDTO';
import { PatientMapper } from '../mappers/PatientMapper';
import { ValidationError, NotFoundError } from '../../../shared/errors'; // (Asegúrate de usar tu index o rutas correctas)
import { PatientReceptionistResponseDTO } from '../dtos/patient/PatientResponseDTO'; // (Ajusta el nombre si es necesario)

export class PatientController {
  
  // 2. Definir las propiedades para los nuevos Casos de Uso
  private createPatientUseCase: CreatePatientUseCase;
  private getPatientByIdUseCase: GetPatientByIdUseCase; // <--- NUEVO
  private listPatientUseCase: ListPatientUseCase;       // <--- NUEVO
  
  // 3. Actualizar el CONSTRUCTOR para recibir los 3 argumentos
  constructor(
    createPatientUseCase: CreatePatientUseCase,
    getPatientByIdUseCase: GetPatientByIdUseCase, // <--- NUEVO
    listPatientUseCase: ListPatientUseCase        // <--- NUEVO
  ) {
    this.createPatientUseCase = createPatientUseCase;
    this.getPatientByIdUseCase = getPatientByIdUseCase;
    this.listPatientUseCase = listPatientUseCase;
  }

  // --- MÉTODO CREAR (Ya lo tenías) ---
  public async crearPaciente(req: Request, res: Response) {
    // ... (Tu código de crearPaciente sigue igual) ...
  }

  // --- NUEVO: MÉTODO GET POR ID ---
  public async getPatientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Llamar al Director de Get
      const paciente = await this.getPatientByIdUseCase.ejecutar(Number(id));
      
      // Mappear respuesta (Aquí uso toDTO genérico, o podrías usar toMedical si es doctor)
      const userRole = (req as any).user?.role || 'RECEPTIONIST'; 
      const response = PatientMapper.toDTO(paciente, userRole);

      return res.status(200).json(response);
    } catch (error) {
      // Manejo simple de error (mejorar con error handler)
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
  }

  // --- NUEVO: MÉTODO LISTAR ---
  public async listPatients(req: Request, res: Response) {
    try {
      // Llamar al Director de List
      const pacientes = await this.listPatientUseCase.ejecutar();
      
      const userRole = (req as any).user?.role || 'RECEPTIONIST';
      // Mappear la lista completa
      const response = pacientes.map(p => PatientMapper.toDTO(p, userRole));

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Error al listar pacientes' });
    }
  }
}