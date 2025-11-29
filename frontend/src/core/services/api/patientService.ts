import apiClient from './base';
import type {
  CreatePatientDTO,
  UpdatePatientDTO,
  PatientAdminResponseDTO,
  PatientListResponseDTO
} from '../../types/dtos';

/**
 * Servicio de Pacientes (Repositorio)
 * 
 * ARQUITECTURA (Como en el video):
 * - Capa de INFRAESTRUCTURA
 * - Implementa comunicación con API
 * - Independiente de la UI y lógica de negocio
 */

/**
 * Interfaz del Repositorio de Pacientes
 */
export interface IPatientRepository {
  getAll(): Promise<PatientListResponseDTO>;
  getById(id: number): Promise<PatientAdminResponseDTO>;
  create(data: CreatePatientDTO): Promise<PatientAdminResponseDTO>;
  update(id: number, data: UpdatePatientDTO): Promise<PatientAdminResponseDTO>;
  delete(id: number): Promise<void>;
  search(query: string): Promise<PatientListResponseDTO>;
  getByDni(dni: string): Promise<PatientAdminResponseDTO>;
}

/**
 * Implementación con Axios
 */
class AxiosPatientRepository implements IPatientRepository {
  async getAll(): Promise<PatientListResponseDTO> {
    try {
      const response = await apiClient.get<PatientListResponseDTO>('/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }

  async getById(id: number): Promise<PatientAdminResponseDTO> {
    try {
      const response = await apiClient.get<PatientAdminResponseDTO>(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreatePatientDTO): Promise<PatientAdminResponseDTO> {
    try {
      const response = await apiClient.post<PatientAdminResponseDTO>('/patients', data);
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async update(id: number, data: UpdatePatientDTO): Promise<PatientAdminResponseDTO> {
    try {
      const response = await apiClient.put<PatientAdminResponseDTO>(`/patients/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating patient ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/patients/${id}`);
    } catch (error) {
      console.error(`Error deleting patient ${id}:`, error);
      throw error;
    }
  }

  async search(query: string): Promise<PatientListResponseDTO> {
    try {
      const response = await apiClient.get<PatientListResponseDTO>(`/patients/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching patients:', error);
      throw error;
    }
  }

  async getByDni(dni: string): Promise<PatientAdminResponseDTO> {
    try {
      const response = await apiClient.get<PatientAdminResponseDTO>(`/patients/dni/${dni}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient by DNI ${dni}:`, error);
      throw error;
    }
  }
}

/**
 * Instancia Singleton
 */
export const patientRepository: IPatientRepository = new AxiosPatientRepository();

/**
 * Service con aliases para compatibilidad
 */
export const patientService = {
  // Métodos principales
  getAll: () => patientRepository.getAll(),
  getById: (id: number) => patientRepository.getById(id),
  create: (data: CreatePatientDTO) => patientRepository.create(data),
  update: (id: number, data: UpdatePatientDTO) => patientRepository.update(id, data),
  delete: (id: number) => patientRepository.delete(id),
  search: (query: string) => patientRepository.search(query),
  getByDni: (dni: string) => patientRepository.getByDni(dni),
  
  // Aliases para compatibilidad con código existente
  getPatients: (filters?: any) => patientRepository.getAll(),
  createPatient: (data: CreatePatientDTO) => patientRepository.create(data),
  updatePatient: (id: number, data: UpdatePatientDTO) => patientRepository.update(id, data),
  deletePatient: (id: number) => patientRepository.delete(id),
};

export default patientService;
