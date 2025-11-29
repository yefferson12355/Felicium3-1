// --- 1. CONEXIONES ---

// ¡CORREGIDO! Importamos IPatientRepository (nombre en Inglés)
// desde el archivo IPatientRepository.ts
import { IPatientRepository } from './interfaces/IPatientRepository';

// Importamos la entidad (que sigue llamándose Paciente en Español)
import { Paciente } from '../../domain/patient/patient.entity';

// Importamos el DTO
import { CreatePatientDTO } from '../../../interfaces/http/dtos/patient/CreatePatientDTO';

// ✅ NUEVO: Importamos el validador de firmas
import { SignatureValidator } from '../../../shared/validators/signature.validator';

export class CreatePatientUseCase {

  constructor(
    // Inyección de Dependencia usando el nombre CORRECTO
    private readonly patientRepository: IPatientRepository
  ) {}

  public async ejecutar(datos: CreatePatientDTO): Promise<Paciente> {
    
    // ✅ NUEVO: Validar firma digital
    const validationResult = SignatureValidator.validate(datos.firmaDigital);
    if (!validationResult.valid) {
      throw new Error(validationResult.error);
    }
    
    // 1. Crear la entidad (Validación de reglas de negocio)
    const nuevoPaciente = Paciente.crear({
      dni: datos.dni,
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      fechaNacimiento: new Date(datos.fechaNacimiento), 
      firmaDigital: datos.firmaDigital,
      odontograma: datos.odontograma,
      telefono: datos.telefono,
      nombreApoderado: datos.nombreApoderado,
      direccion: datos.direccion,
      observaciones: datos.observaciones ? [datos.observaciones] : [] // Conversión aquí
    });

    // 2. Guardar en Base de Datos y recibir la entidad actualizada con ID
    const pacienteGuardado = await this.patientRepository.guardar(nuevoPaciente);

    // 3. Devolver el paciente guardado (con ID asignado)
    return pacienteGuardado;
  }
}