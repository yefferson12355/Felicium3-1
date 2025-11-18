
import { Paciente } from '../../../domain/patient/patient.entity';

//Contrato de Repositorio para Paciente
export interface IPatientRepository {
  guardar(paciente: Paciente): Promise<void>;
  buscarPorId(id: number): Promise<Paciente | null>;
  buscarPorDni(dni: string): Promise<Paciente | null>;
  obtenerTodos(): Promise<Paciente[]>;
}