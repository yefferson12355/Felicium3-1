import apiClient from './base';
import type {
  CreateOdontogramDTO,
  UpdateOdontogramDTO,
  OdontogramResponseDTO
} from '../../types/dtos/odontogram.dto';

/**
 * Servicio de Odontogramas (Repositorio)
 * 
 * ARQUITECTURA (Como en el video):
 * - Capa de INFRAESTRUCTURA
 * - Implementa comunicación con API
 */

/**
 * Interfaz del Repositorio de Odontogramas
 */
export interface IOdontogramRepository {
  create(data: CreateOdontogramDTO): Promise<OdontogramResponseDTO>;
  getById(id: string): Promise<OdontogramResponseDTO>;
  getByPatient(patientId: string): Promise<OdontogramResponseDTO>;
  updateTooth(id: string, data: UpdateOdontogramDTO): Promise<OdontogramResponseDTO>;
  delete(id: string): Promise<void>;
}

/**
 * Implementación con Axios
 */
class AxiosOdontogramRepository implements IOdontogramRepository {
  async create(data: CreateOdontogramDTO): Promise<OdontogramResponseDTO> {
    try {
      console.log('🦷 Creating odontogram:', data);
      const response = await apiClient.post<OdontogramResponseDTO>('/odontogram', data);
      return response.data;
    } catch (error) {
      console.error('Error creating odontogram:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<OdontogramResponseDTO> {
    try {
      const response = await apiClient.get<OdontogramResponseDTO>(`/odontogram/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching odontogram ${id}:`, error);
      throw error;
    }
  }

  async getByPatient(patientId: string): Promise<OdontogramResponseDTO> {
    try {
      const response = await apiClient.get<OdontogramResponseDTO>(`/odontogram/patient/${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching odontogram for patient ${patientId}:`, error);
      throw error;
    }
  }

  async updateTooth(id: string, data: UpdateOdontogramDTO): Promise<OdontogramResponseDTO> {
    try {
      console.log(`🦷 Updating tooth in odontogram ${id}:`, data);
      const response = await apiClient.put<OdontogramResponseDTO>(`/odontogram/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating odontogram ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/odontogram/${id}`);
    } catch (error) {
      console.error(`Error deleting odontogram ${id}:`, error);
      throw error;
    }
  }
}

/**
 * Instancia Singleton
 */
export const odontogramRepository: IOdontogramRepository = new AxiosOdontogramRepository();

/**
 * DEPRECATED: Compatibilidad con código legacy
 */
export const odontogramService = {
  createOdontogram: (data: CreateOdontogramDTO) => odontogramRepository.create(data),
  getOdontogramById: (id: string) => odontogramRepository.getById(id),
  getOdontogramByPatient: (patientId: string) => odontogramRepository.getByPatient(patientId),
  updateTooth: (id: string, data: UpdateOdontogramDTO) => odontogramRepository.updateTooth(id, data),
  deleteOdontogram: (id: string) => odontogramRepository.delete(id),
};

export default odontogramService;
