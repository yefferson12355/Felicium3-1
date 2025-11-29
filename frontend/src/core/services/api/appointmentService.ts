import apiClient from './base';
import type {
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  AppointmentResponseDTO,
  AppointmentListResponseDTO
} from '../../types/dtos';

/**
 * Servicio de Citas (Appointments)
 * 
 * ARQUITECTURA (Como en el video):
 * - Esta es la capa de INFRAESTRUCTURA (Repositorio)
 * - Implementa la lógica de comunicación con la API
 * - Los Casos de Uso (hooks) llaman a estos métodos
 * - Si cambias de axios a fetch, solo cambias este archivo
 */

/**
 * Interfaz del Repositorio
 * (Como en el video: Define el contrato, no la implementación)
 */
export interface IAppointmentRepository {
  getAll(): Promise<AppointmentListResponseDTO>;
  getById(id: string): Promise<AppointmentResponseDTO>;
  create(data: CreateAppointmentDTO): Promise<AppointmentResponseDTO>;
  update(id: string, data: UpdateAppointmentDTO): Promise<AppointmentResponseDTO>;
  delete(id: string): Promise<void>;
  getByPatient(patientId: string): Promise<AppointmentListResponseDTO>;
  getByDentist(dentistId: string): Promise<AppointmentListResponseDTO>;
  getByDateRange(startDate: string, endDate: string): Promise<AppointmentListResponseDTO>;
  confirmAppointment(id: string): Promise<AppointmentResponseDTO>;
  cancelAppointment(id: string): Promise<AppointmentResponseDTO>;
  completeAppointment(id: string): Promise<AppointmentResponseDTO>;
}

/**
 * Implementación con Axios
 * (Como en el video: Esto puede cambiar a fetch, pero la interfaz no cambia)
 */
class AxiosAppointmentRepository implements IAppointmentRepository {
  async getAll(): Promise<AppointmentListResponseDTO> {
    try {
      const response = await apiClient.get<AppointmentListResponseDTO>('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.get<AppointmentResponseDTO>(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateAppointmentDTO): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.post<AppointmentResponseDTO>('/appointments', data);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateAppointmentDTO): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.put<AppointmentResponseDTO>(`/appointments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating appointment ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/appointments/${id}`);
    } catch (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
  }

  async getByPatient(patientId: string): Promise<AppointmentListResponseDTO> {
    try {
      const response = await apiClient.get<AppointmentListResponseDTO>('/appointments', {
        params: { patientId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error);
      throw error;
    }
  }

  async getByDentist(dentistId: string): Promise<AppointmentListResponseDTO> {
    try {
      const response = await apiClient.get<AppointmentListResponseDTO>('/appointments', {
        params: { dentistId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointments for dentist ${dentistId}:`, error);
      throw error;
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<AppointmentListResponseDTO> {
    try {
      const response = await apiClient.get<AppointmentListResponseDTO>('/appointments', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments by date range:', error);
      throw error;
    }
  }

  async confirmAppointment(id: string): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.patch<AppointmentResponseDTO>(`/appointments/${id}/confirm`);
      return response.data;
    } catch (error) {
      console.error(`Error confirming appointment ${id}:`, error);
      throw error;
    }
  }

  async cancelAppointment(id: string): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.patch<AppointmentResponseDTO>(`/appointments/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling appointment ${id}:`, error);
      throw error;
    }
  }

  async completeAppointment(id: string): Promise<AppointmentResponseDTO> {
    try {
      const response = await apiClient.patch<AppointmentResponseDTO>(`/appointments/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing appointment ${id}:`, error);
      throw error;
    }
  }
}

/**
 * Instancia Singleton del Repositorio
 * (Inyección de Dependencias simple)
 */
export const appointmentRepository: IAppointmentRepository = new AxiosAppointmentRepository();

/**
 * DEPRECATED: Mantener para compatibilidad con código legacy
 * TODO: Migrar todos los imports a usar 'appointmentRepository'
 */
export const appointmentService = {
  getAll: () => appointmentRepository.getAll(),
  getById: (id: string) => appointmentRepository.getById(id),
  create: (data: CreateAppointmentDTO) => appointmentRepository.create(data),
  update: (id: string, data: UpdateAppointmentDTO) => appointmentRepository.update(id, data),
  delete: (id: string) => appointmentRepository.delete(id),
  getByPatient: (patientId: string) => appointmentRepository.getByPatient(patientId),
  getByDentist: (dentistId: string) => appointmentRepository.getByDentist(dentistId),
  getByDateRange: (startDate: string, endDate: string) => appointmentRepository.getByDateRange(startDate, endDate),
  confirmAppointment: (id: string) => appointmentRepository.confirmAppointment(id),
  cancelAppointment: (id: string) => appointmentRepository.cancelAppointment(id),
  completeAppointment: (id: string) => appointmentRepository.completeAppointment(id),
  
  // Aliases para compatibilidad con código existente
  getAppointments: (filters?: any) => appointmentRepository.getAll(),
  createAppointment: (data: CreateAppointmentDTO) => appointmentRepository.create(data),
  updateAppointment: (id: string, data: UpdateAppointmentDTO) => appointmentRepository.update(id, data),
  deleteAppointment: (id: string) => appointmentRepository.delete(id),
};

export default appointmentService;
