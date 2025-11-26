import { IPatientRepository } from './interfaces/IPatientRepository';
import { Paciente } from '../../domain/patient/patient.entity';

export class GetPatientByIdUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  public async ejecutar(id: number): Promise<Paciente> {
    const paciente = await this.repository.buscarPorId(id);

    if (!paciente) {
      throw new Error(`Paciente con ID ${id} no encontrado.`);
    }

    return paciente;
  }
}