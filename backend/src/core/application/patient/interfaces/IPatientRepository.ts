
import { Paciente } from '../../../domain/patient/patient.entity';

//Contrato de Repositorio para Paciente
export interface IPatientRepository {
  guardar(paciente: Paciente): Promise<Paciente>;  // ✅ Ahora devuelve la entidad guardada con ID
  buscarPorId(id: number): Promise<Paciente | null>;
  buscarPorDni(dni: string): Promise<Paciente | null>;
  obtenerTodos(): Promise<Paciente[]>;
}