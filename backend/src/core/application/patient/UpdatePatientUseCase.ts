import { IPatientRepository } from './interfaces/IPatientRepository';
import { Paciente } from '../../domain/patient/patient.entity';
// ¡AQUÍ ESTÁ LA CONEXIÓN! Importamos al "Chef" (Behavior)
import { ComportamientoPaciente } from '../../domain/patient/patient.behavior';
// Asumimos que existe el DTO (aunque lo crearemos luego)
import { UpdatePatientDTO } from '../../../interfaces/http/dtos/patient/UpdatePatientDTO';
// ✅ NUEVO: Importamos el validador de firmas
import { SignatureValidator } from '../../../shared/validators/signature.validator';

export class UpdatePatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  public async ejecutar(id: number, datos: UpdatePatientDTO): Promise<Paciente> {
    // 1. Buscar al paciente actual
    const paciente = await this.repository.buscarPorId(id);

    if (!paciente) {
      throw new Error(`Paciente con ID ${id} no encontrado.`);
    }

    // ✅ NUEVO: Si se intenta cambiar firma, validar que sea válida
    if (datos.firmaDigital) {
      const validationResult = SignatureValidator.validate(datos.firmaDigital);
      if (!validationResult.valid) {
        throw new Error(validationResult.error);
      }
    }

    // 2. Usar el COMPORTAMIENTO (Chef) para aplicar los cambios
    // El Caso de Uso NO modifica los datos directamente (ej: paciente.nombre = ...).
    // Le pide al experto (Comportamiento) que lo haga.
    const pacienteActualizado = ComportamientoPaciente.actualizar(paciente, {
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      telefono: datos.telefono,
      fechaNacimiento: datos.fechaNacimiento ? new Date(datos.fechaNacimiento) : undefined,
      firmaDigital: datos.firmaDigital,
      odontograma: datos.odontograma,
      nombreApoderado: datos.nombreApoderado,
      direccion: datos.direccion
    });

    // 3. Guardar los cambios
    await this.repository.guardar(pacienteActualizado);

    return pacienteActualizado;
  }
}