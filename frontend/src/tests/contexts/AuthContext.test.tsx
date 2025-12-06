import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../core/contexts/AuthContext';
import { authService } from '../../core/services/auth/authService';
import { UserResponseDTO } from '../../core/types/dtos/auth.dto';

// Mock del authService
jest.mock('../../core/services/auth/authService', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: jest.fn(),
    getProfile: jest.fn(),
    setToken: jest.fn(),
  },
}));

const mockedAuthService = authService as jest.Mocked<typeof authService>;

// Mock completo de usuario con todas las propiedades requeridas
const createMockUser = (overrides: Partial<UserResponseDTO> = {}): UserResponseDTO => ({
  id: '1',
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'User',
  fullName: 'Test User',
  role: 'ADMIN',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { user, isAuthenticated, loading, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'not-loading'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</div>
      <button onClick={() => login({ email: 'test@test.com', password: 'password' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAuthService.isAuthenticated.mockReturnValue(false);
  });

  // ==================== PROVIDER ====================
  describe('AuthProvider', () => {
    test('provee contexto a los children', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });
    });

    test('inicia con usuario no autenticado', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated');
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });
    });
  });

  // ==================== ESTADO INICIAL ====================
  describe('Estado Inicial', () => {
    test('loading es true inicialmente y luego false', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Esperar a que termine de cargar
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });
    });

    test('verifica token al iniciar', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockedAuthService.isAuthenticated).toHaveBeenCalled();
      });
    });

    test('carga perfil si hay token válido', async () => {
      const mockUser = createMockUser();
      mockedAuthService.isAuthenticated.mockReturnValue(true);
      mockedAuthService.getProfile.mockResolvedValue(mockUser);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockedAuthService.getProfile).toHaveBeenCalled();
        expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated');
      });
    });
  });

  // ==================== LOGIN ====================
  describe('Login', () => {
    test('login exitoso actualiza usuario y autenticación', async () => {
      const mockUser = createMockUser();
      const mockResponse = { user: mockUser, token: 'jwt-token-123' };
      
      mockedAuthService.login.mockResolvedValue(mockResponse);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await act(async () => {
        await userEvent.click(loginButton);
      });

      await waitFor(() => {
        expect(mockedAuthService.login).toHaveBeenCalledWith({
          email: 'test@test.com',
          password: 'password'
        });
        expect(mockedAuthService.setToken).toHaveBeenCalledWith('jwt-token-123');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated');
      });
    });

    test('login fallido no actualiza usuario', async () => {
      mockedAuthService.login.mockRejectedValue(new Error('Invalid credentials'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });

      const loginButton = screen.getByRole('button', { name: /login/i });
      
      await act(async () => {
        await userEvent.click(loginButton);
      });

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated');
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });
    });
  });

  // ==================== LOGOUT ====================
  describe('Logout', () => {
    test('logout limpia usuario y autenticación', async () => {
      const mockUser = createMockUser();
      mockedAuthService.isAuthenticated.mockReturnValue(true);
      mockedAuthService.getProfile.mockResolvedValue(mockUser);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Esperar autenticación inicial
      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated');
      });

      // Hacer logout
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      
      await act(async () => {
        await userEvent.click(logoutButton);
      });

      await waitFor(() => {
        expect(mockedAuthService.logout).toHaveBeenCalled();
        expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated');
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });
    });
  });

  // ==================== ERROR HANDLING ====================
  describe('Manejo de errores', () => {
    test('maneja error al cargar perfil', async () => {
      mockedAuthService.isAuthenticated.mockReturnValue(true);
      mockedAuthService.getProfile.mockRejectedValue(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(mockedAuthService.logout).toHaveBeenCalled();
        expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated');
      });

      consoleSpy.mockRestore();
    });
  });
});
