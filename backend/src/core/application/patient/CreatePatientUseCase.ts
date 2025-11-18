// --- 1. CONEXIONES (Las Importaciones) ---
// ¡Este es el "Director"! Es el ÚNICO que importa y conecta todo.

// A. Importa el "Contrato" del Almacén (El Enchufe)
import { IPacienteRepository } from './interfaces/IPatientRepository';

// B. Importa la "Fábrica" de la Entidad (El Ingrediente)
// (Solo necesitamos la clase 'Paciente' para llamar a 'Paciente.crear')
import { Paciente } from '../../domain/patient/patient.entity';

// C. (Opcional pero recomendado) Importa el "DTO" (el formulario)
// Este DTO (Data Transfer Object) define la "forma" de los datos
// que nos llegan desde el Controlador (desde Internet).
// ¡Está en tu arquitectura, así que lo usamos!
import { CreatePatientDTO } from '../../../interfaces/http/dtos/patient/CreatePatientDTO';


/**
 * @class CreatePatientUseCase
 * @description Esta es la "Receta" o "Caso de Uso" para crear un paciente.
 * Orquesta todo el proceso.
 */
export class CreatePatientUseCase {

  // --- 2. EL CONSTRUCTOR (Inyección de Dependencias) ---
  
  // El Director (Caso de Uso) "pide" en su constructor
  // que le pasen el "Contrato" (el enchufe) del Almacén.
  // NO pide la implementación de Postgres, pide la Interfaz.
  constructor(
    private readonly pacienteRepository: IPacienteRepository
  ) {}

  // --- 3. EL MÉTODO "ejecutar" (La Receta paso a paso) ---
  
  /**
   * Ejecuta la lógica para crear un nuevo paciente.
   * @param datos El "formulario" (DTO) con los datos del paciente.
   * @returns El paciente recién creado.
   */
  public async ejecutar(datos: CreatePatientDTO): Promise<Paciente> {
    
    // --- LA RECETA DE 3 PASOS ---

    // Paso 1: Usar la "Fábrica" del Dominio para crear el "Ingrediente"
    // (Paciente.crear)
    // En este paso, la Fábrica MISMA llamará a 'ReglasPaciente'
    // y validará el DNI, email, etc. Si algo falla,
    // ¡'Paciente.crear' lanzará un "throw new Error" y todo se detendrá!
    const nuevoPaciente = Paciente.crear({
      dni: datos.dni,
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      fechaNacimiento: datos.fechaNacimiento,
      firmaDigital: datos.firmaDigital,
      odontograma: datos.odontograma,
      
      // Opcionales
      telefono: datos.telefono,
      nombreApoderado: datos.nombreApoderado,
      direccion: datos.direccion,
      observaciones: datos.observaciones
    });

    // Paso 2: Llamar al "Almacén" (Repositorio) para guardar
    // Le pasamos el "Ingrediente" (nuevoPaciente) al "Almacén".
    // "await" es clave: le dice al código "espera a que la base de datos
    // termine de guardar antes de continuar".
    await this.pacienteRepository.guardar(nuevoPaciente);

    // Paso 3: Devolver el ingrediente recién creado
    // (Ahora 'nuevoPaciente' podría tener un ID asignado por la BD)
    return nuevoPaciente;
  }
}