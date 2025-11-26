import { IPatientRepository } from './interfaces/IPatientRepository';
import { Paciente } from '../../domain/patient/patient.entity';
import { CreatePatientDTO } from '../../../interfaces/http/dtos/patient/CreatePatientDTO';

export class CreatePatientUseCase {

  constructor(
    private readonly patientRepository: IPatientRepository
  ) {}

  public async ejecutar(datos: CreatePatientDTO): Promise<Paciente> {
    console.log("🔸 A. USECASE: Iniciando ejecución...");

    try {
        // 1. Crear la entidad
        console.log("🔸 B. USECASE: Llamando a la Fábrica Paciente.crear...");
        
        const nuevoPaciente = Paciente.crear({
          dni: datos.dni,
          nombre: datos.nombre,
          apellido: datos.apellido,
          email: datos.email,
          fechaNacimiento: new Date(datos.fechaNacimiento), 
          firmaDigital: datos.firmaDigital,
          odontograma: datos.odontograma,
          telefono: datos.telefono || null,
          nombreApoderado: datos.nombreApoderado || null,
          direccion: datos.direccion || null,
          observaciones: datos.observaciones || []
        });

        // 2. Guardar en Base de Datos y CAPTURAR EL ID
        console.log("🔸 C. USECASE: Entidad creada. Llamando al Repositorio...");
        
        // 👇 AQUÍ ESTÁ LA CLAVE QUE TE FALTA 👇
        const newId = await this.patientRepository.guardar(nuevoPaciente);

        // 👇 Mira este log nuevo, este es el que tienes que ver
        console.log("🔸 D. USECASE: Repositorio terminó. ID RECIBIDO:", newId);

        // 👇 ASIGNAR EL ID A LA ENTIDAD
        (nuevoPaciente as any).id = newId;

        // 3. Devolver
        return nuevoPaciente;

    } catch (error) {
        console.error("🔸 ❌ ERROR EN USECASE:", error);
        throw error; 
    }
  }
}