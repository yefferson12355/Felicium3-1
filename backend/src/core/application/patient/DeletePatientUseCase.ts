import { IPatientRepository } from './interfaces/IPatientRepository';
import { ComportamientoPaciente } from '../../domain/patient/patient.behavior';

export class DeletePatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  public async ejecutar(id: string): Promise<void> {
    // 1. Buscar
    const paciente = await this.repository.buscarPorId(id);

    if (!paciente) {
      throw new Error(`Paciente con ID ${id} no encontrado.`);
    }

    // 2. Aplicar Comportamiento (Soft Delete)
    // Llamamos a la función 'desactivar' que creamos en el archivo behavior
    const pacienteDesactivado = ComportamientoPaciente.desactivar(paciente);

    // 3. Guardar el cambio (el repositorio hará un UPDATE set estaActivo = false)
    await this.repository.guardar(pacienteDesactivado);
  }
}