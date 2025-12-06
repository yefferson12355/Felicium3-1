import apiClient from '../../core/services/api/base';
import patientService from '../../core/services/api/patientService';

// Mock de apiClient
jest.mock('../../core/services/api/base', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('PatientService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== GET ALL ====================
  describe('getAll', () => {
    test('obtiene lista de pacientes exitosamente', async () => {
      const mockPatients = [
        { id: '1', nombre: 'Juan', apellido: 'Pérez', dni: '12345678' },
        { id: '2', nombre: 'María', apellido: 'García', dni: '87654321' },
      ];
      
      mockedApiClient.get.mockResolvedValueOnce({ data: mockPatients } as any);

      const result = await patientService.getAll();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/patients');
      expect(result).toEqual(mockPatients);
    });

    test('maneja error al obtener pacientes', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(patientService.getAll()).rejects.toThrow('Network Error');
    });
  });

  // ==================== GET BY ID ====================
  describe('getById', () => {
    test('obtiene paciente por ID exitosamente', async () => {
      const mockPatient = { id: '1', nombre: 'Juan', apellido: 'Pérez' };
      
      mockedApiClient.get.mockResolvedValueOnce({ data: mockPatient } as any);

      const result = await patientService.getById(1);

      expect(mockedApiClient.get).toHaveBeenCalledWith('/patients/1');
      expect(result).toEqual(mockPatient);
    });

    test('maneja error cuando paciente no existe', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Patient not found'));

      await expect(patientService.getById(999)).rejects.toThrow('Patient not found');
    });
  });

  // ==================== CREATE ====================
  describe('create', () => {
    test('crea paciente exitosamente', async () => {
      const newPatient = {
        nombre: 'Nuevo',
        apellido: 'Paciente',
        dni: '11111111',
        email: 'nuevo@test.com',
        fechaNacimiento: '1990-01-01',
        firmaDigital: 'base64...'
      };
      
      const createdPatient = { id: '3', ...newPatient };
      mockedApiClient.post.mockResolvedValueOnce({ data: createdPatient } as any);

      const result = await patientService.create(newPatient as any);

      expect(mockedApiClient.post).toHaveBeenCalledWith('/patients', newPatient);
      expect(result).toEqual(createdPatient);
    });

    test('maneja error de validación al crear', async () => {
      mockedApiClient.post.mockRejectedValueOnce(new Error('Validation Error'));

      await expect(patientService.create({} as any)).rejects.toThrow('Validation Error');
    });
  });

  // ==================== UPDATE ====================
  describe('update', () => {
    test('actualiza paciente exitosamente', async () => {
      const updateData = { nombre: 'Actualizado', email: 'updated@test.com' };
      const updatedPatient = { id: '1', ...updateData };
      
      mockedApiClient.put.mockResolvedValueOnce({ data: updatedPatient } as any);

      const result = await patientService.update(1, updateData as any);

      expect(mockedApiClient.put).toHaveBeenCalledWith('/patients/1', updateData);
      expect(result).toEqual(updatedPatient);
    });

    test('maneja error al actualizar', async () => {
      mockedApiClient.put.mockRejectedValueOnce(new Error('Update failed'));

      await expect(patientService.update(1, {} as any)).rejects.toThrow('Update failed');
    });
  });

  // ==================== DELETE ====================
  describe('delete', () => {
    test('elimina paciente exitosamente', async () => {
      mockedApiClient.delete.mockResolvedValueOnce({ data: {} } as any);

      await patientService.delete(1);

      expect(mockedApiClient.delete).toHaveBeenCalledWith('/patients/1');
    });

    test('maneja error al eliminar', async () => {
      mockedApiClient.delete.mockRejectedValueOnce(new Error('Delete failed'));

      await expect(patientService.delete(1)).rejects.toThrow('Delete failed');
    });
  });

  // ==================== SEARCH ====================
  describe('search', () => {
    test('busca pacientes por query', async () => {
      const mockResults = [
        { id: '1', nombre: 'Juan', apellido: 'Pérez' }
      ];
      
      mockedApiClient.get.mockResolvedValueOnce({ data: mockResults } as any);

      const result = await patientService.search('Juan');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/patients/search', { params: { q: 'Juan' } });
      expect(result).toEqual(mockResults);
    });

    test('retorna array vacío si no hay resultados', async () => {
      mockedApiClient.get.mockResolvedValueOnce({ data: [] } as any);

      const result = await patientService.search('NoExiste');

      expect(result).toEqual([]);
    });
  });

  // ==================== GET BY DNI ====================
  describe('getByDni', () => {
    test('busca paciente por DNI', async () => {
      const mockPatient = { id: '1', nombre: 'Juan', dni: '12345678' };
      
      mockedApiClient.get.mockResolvedValueOnce({ data: mockPatient } as any);

      const result = await patientService.getByDni('12345678');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/patients/dni/12345678');
      expect(result).toEqual(mockPatient);
    });

    test('maneja error cuando DNI no existe', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('DNI not found'));

      await expect(patientService.getByDni('00000000')).rejects.toThrow('DNI not found');
    });
  });
});
