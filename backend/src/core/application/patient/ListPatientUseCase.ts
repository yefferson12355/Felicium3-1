import { IPatientRepository } from './interfaces/IPatientRepository';
import { Paciente } from '../../domain/patient/patient.entity';

export class ListPatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  public async ejecutar(): Promise<Paciente[]> {
    return await this.repository.obtenerTodos();
  }
}