import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useApi } from '../../core/hooks/useApi';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useApi Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== ESTADO INICIAL ====================
  describe('Estado Inicial', () => {
    test('inicia con loading false', () => {
      const { result } = renderHook(() => useApi());
      
      expect(result.current.loading).toBe(false);
    });

    test('inicia con error null', () => {
      const { result } = renderHook(() => useApi());
      
      expect(result.current.error).toBe(null);
    });

    test('expone métodos get, post, put, remove', () => {
      const { result } = renderHook(() => useApi());
      
      expect(typeof result.current.get).toBe('function');
      expect(typeof result.current.post).toBe('function');
      expect(typeof result.current.put).toBe('function');
      expect(typeof result.current.remove).toBe('function');
    });
  });

  // ==================== GET REQUEST ====================
  describe('GET Request', () => {
    test('realiza GET request exitoso', async () => {
      const mockData = { users: [{ id: 1, name: 'Test' }] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.get('/api/users');
      });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/users', {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.data).toEqual(mockData);
      expect(response.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    test('maneja error en GET request', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.get('/api/users');
      });

      expect(response.data).toBeNull();
      expect(response.error).toBe('Network Error');
      expect(result.current.error).toBe('Network Error');
    });

    test('GET con headers personalizados', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: {} });

      const { result } = renderHook(() => useApi());

      await act(async () => {
        await result.current.get('/api/protected', {
          headers: { Authorization: 'Bearer token123' }
        });
      });

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/protected', {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123' 
        },
      });
    });
  });

  // ==================== POST REQUEST ====================
  describe('POST Request', () => {
    test('realiza POST request exitoso', async () => {
      const mockResponse = { id: 1, name: 'New User' };
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useApi());
      const postData = { name: 'New User', email: 'test@test.com' };

      let response: any;
      await act(async () => {
        response = await result.current.post('/api/users', postData);
      });

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/users', postData, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.data).toEqual(mockResponse);
      expect(response.error).toBeNull();
    });

    test('maneja error en POST request', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Validation Error'));

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.post('/api/users', { invalid: 'data' });
      });

      expect(response.data).toBeNull();
      expect(response.error).toBe('Validation Error');
    });

    test('POST con headers personalizados', async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: {} });

      const { result } = renderHook(() => useApi());

      await act(async () => {
        await result.current.post('/api/data', { test: true }, {
          headers: { 'X-Custom-Header': 'value' }
        });
      });

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/data', { test: true }, {
        headers: { 
          'Content-Type': 'application/json',
          'X-Custom-Header': 'value' 
        },
      });
    });
  });

  // ==================== PUT REQUEST ====================
  describe('PUT Request', () => {
    test('realiza PUT request exitoso', async () => {
      const mockResponse = { id: 1, name: 'Updated User' };
      mockedAxios.put.mockResolvedValueOnce({ data: mockResponse });

      const { result } = renderHook(() => useApi());
      const updateData = { name: 'Updated User' };

      let response: any;
      await act(async () => {
        response = await result.current.put('/api/users/1', updateData);
      });

      expect(mockedAxios.put).toHaveBeenCalledWith('/api/users/1', updateData, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.data).toEqual(mockResponse);
      expect(response.error).toBeNull();
    });

    test('maneja error en PUT request', async () => {
      mockedAxios.put.mockRejectedValueOnce(new Error('Not Found'));

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.put('/api/users/999', {});
      });

      expect(response.data).toBeNull();
      expect(response.error).toBe('Not Found');
    });
  });

  // ==================== DELETE REQUEST ====================
  describe('DELETE Request', () => {
    test('realiza DELETE request exitoso', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: { success: true } });

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.remove('/api/users/1');
      });

      expect(mockedAxios.delete).toHaveBeenCalledWith('/api/users/1', {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.data).toEqual({ success: true });
      expect(response.error).toBeNull();
    });

    test('maneja error en DELETE request', async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error('Forbidden'));

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.remove('/api/users/1');
      });

      expect(response.data).toBeNull();
      expect(response.error).toBe('Forbidden');
    });
  });

  // ==================== LOADING STATE ====================
  describe('Loading State', () => {
    test('loading es true durante la petición', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      
      mockedAxios.get.mockReturnValueOnce(promise as any);

      const { result } = renderHook(() => useApi());

      act(() => {
        result.current.get('/api/slow');
      });

      // Loading debería ser true inmediatamente después de iniciar
      expect(result.current.loading).toBe(true);

      // Resolver la promesa
      await act(async () => {
        resolvePromise!({ data: {} });
        await promise;
      });

      expect(result.current.loading).toBe(false);
    });
  });

  // ==================== ERROR MESSAGES ====================
  describe('Error Messages', () => {
    test('usa mensaje de error personalizado si no hay message', async () => {
      mockedAxios.get.mockRejectedValueOnce({});

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.get('/api/error');
      });

      expect(response.error).toBe('Error fetching data');
    });

    test('usa mensaje de error del backend', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Email already exists'));

      const { result } = renderHook(() => useApi());

      let response: any;
      await act(async () => {
        response = await result.current.post('/api/register', {});
      });

      expect(response.error).toBe('Email already exists');
    });
  });
});
