import { Paciente } from '../../../domain/patient/patient.entity';

// Contrato de Repositorio para Paciente
export interface IPatientRepository {
  // CAMBIO: Ahora devuelve 'number' (el ID generado), no 'void'
  guardar(paciente: Paciente): Promise<number>;
  
  buscarPorId(id: number): Promise<Paciente | null>;
  buscarPorDni(dni: string): Promise<Paciente | null>;
  obtenerTodos(): Promise<Paciente[]>;
}