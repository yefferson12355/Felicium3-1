import { Request, Response } from 'express';
// 1. Importamos al Director (Caso de Uso)
import { CreatePatientUseCase } from '../../../core/application/patient/CreatePatientUseCase';
// 2. Importamos el DTO de entrada para validar la forma del cuerpo de la petición
import { CreatePatientDTO } from '../dtos/patient/CreatePatientDTO'; 
// 3. Importamos el Traductor (Mapper) para dar la respuesta filtrada
import { PatientMapper } from '../mappers/PatientMapper';
// 4. Importamos las clases de errores del Dominio
import { ValidationError, NotFoundError } from '../../shared/errors/DomainError'; // Asumimos esta ruta
// Importamos el DTO de Respuesta para el tipado (el DTO que se envía de vuelta)
import { PatientReceptionistResponseDTO } from '../dtos/patient/PatientResponse.dto';


/**
 * @class PatientController
 * @description Maneja las peticiones HTTP (la Recepcionista).
 * Su única tarea es recibir la petición, llamar al Director (Use Case) y responder.
 */
export class PatientController {
  
  // Dependencia del Director (Caso de Uso)
  private createPatientUseCase: CreatePatientUseCase;
  
  /**
   * El constructor pide el Director por Inyección de Dependencias.
   * Esto mantiene al Controlador 'limpio' y desacoplado.
   */
  constructor(createPatientUseCase: CreatePatientUseCase) {
    this.createPatientUseCase = createPatientUseCase;
    // Aquí se inyectarían todos los demás Casos de Uso (Get, List, etc.)
  }

  /**
   * Método público que se usa en las rutas: POST /api/patients
   */
  public async crearPaciente(req: Request, res: Response) {
    // Nota: Se asume que un Middleware de Validación ya revisó que el req.body 
    // cumpla con el CreatePatientDTO antes de llegar aquí.
    
    try {
      // 1. El Recepcionista recibe la orden (req.body)
      const inputData: CreatePatientDTO = req.body; 

      // 2. Llama al Director (Caso de Uso) y le da el formulario.
      // El director ahora ejecuta toda la lógica: validación DNI, email, y guardar en BD.
      const pacienteCreado = await this.createPatientUseCase.ejecutar(inputData);

      // 3. Determinar el Rol del Usuario (viene del authMiddleware)
      // Esto es CRUCIAL para la seguridad de la respuesta.
      const userRole = (req as any).user?.role; 
      
      // 4. Usar el Traductor (Mapper) para obtener la respuesta filtrada por rol
      const responseDTO: PatientReceptionistResponseDTO = PatientMapper.toDTO(pacienteCreado, userRole);

      // 5. Enviar respuesta HTTP al cliente (201 Created)
      return res.status(201).json({
        success: true,
        data: responseDTO,
        message: 'Paciente creado exitosamente.'
      });

    } catch (error) {
      // 6. Manejo de Errores. Aquí el error handler global lo atraparía.
      // Si el Dominio lanzó un 'ValidationError', devolvemos 400.
      if (error instanceof ValidationError) {
         return res.status(400).json({ message: error.message });
      }
      if (error instanceof NotFoundError) {
         return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Error interno del servidor. Contacte a soporte.' });
    }
  }

  // Aquí irían otros métodos: getPatientById, listPatients, etc.
}