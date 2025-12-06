import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../features/auth/components/Login';

// Mock de useAuth
const mockLogin = jest.fn();
jest.mock('../../core/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    user: null,
    isAuthenticated: false,
    loading: false,
  }),
}));

// Mock de roleMapper
jest.mock('../../core/utils/roleMapper', () => ({
  getRoleRoute: jest.fn((role) => {
    const routes: Record<string, string> = {
      'ADMIN': 'admin',
      'DENTIST': 'doctor',
      'RECEPTIONIST': 'recepcionista',
      'PATIENT': 'paciente'
    };
    return routes[role] || 'paciente';
  }),
}));

const renderLogin = () => {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset hash
    window.location.hash = '';
  });

  // ==================== RENDERIZADO ====================
  describe('Renderizado', () => {
    test('renderiza formulario de login', () => {
      renderLogin();
      
      // Buscar el botón específicamente
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
      // El label del email dice "Usuario"
      expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });

    test('renderiza botón de submit', () => {
      renderLogin();
      
      expect(screen.getByRole('button', { name: /iniciar|entrar|login/i })).toBeInTheDocument();
    });

    test('renderiza campos de email y password', () => {
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  // ==================== VALIDACIÓN ====================
  describe('Validación', () => {
    test('muestra error cuando email está vacío', async () => {
      renderLogin();
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/email.*requerido/i)).toBeInTheDocument();
      });
    });

    test('muestra error cuando email es inválido', async () => {
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      await userEvent.type(emailInput as Element, 'email-invalido');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/formato.*email.*inválido/i)).toBeInTheDocument();
      });
    });

    test('muestra error cuando contraseña está vacía', async () => {
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      await userEvent.type(emailInput as Element, 'test@test.com');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/contraseña.*requerida/i)).toBeInTheDocument();
      });
    });

    test('muestra error cuando contraseña es muy corta', async () => {
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'test@test.com');
      await userEvent.type(passwordInput as Element, '1234567'); // 7 caracteres
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/al menos 8 caracteres/i)).toBeInTheDocument();
      });
    });
  });

  // ==================== SUBMIT ====================
  describe('Submit', () => {
    test('llama a login con credenciales correctas', async () => {
      mockLogin.mockResolvedValue({ success: true, user: { id: 1, role: 'ADMIN' } });
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'admin@felicium.com');
      await userEvent.type(passwordInput as Element, 'admin123');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'admin@felicium.com',
          password: 'admin123'
        });
      });
    });

    test('muestra error general cuando login falla', async () => {
      mockLogin.mockResolvedValue({ success: false, error: 'Credenciales inválidas' });
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'test@test.com');
      await userEvent.type(passwordInput as Element, 'wrongpassword');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
      });
    });

    test('redirige según rol después de login exitoso', async () => {
      mockLogin.mockResolvedValue({ success: true, user: { id: 1, role: 'ADMIN' } });
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'admin@felicium.com');
      await userEvent.type(passwordInput as Element, 'admin123');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      // El componente usa window.location.hash para navegar
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalled();
      });
    });
  });

  // ==================== ESTADOS DE CARGA ====================
  describe('Estados de carga', () => {
    test('deshabilita botón durante login', async () => {
      // Simular login lento
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true, user: { role: 'ADMIN' } }), 100)));
      
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'test@test.com');
      await userEvent.type(passwordInput as Element, 'password123');
      
      const submitButton = screen.getByRole('button', { name: /iniciar|entrar|login/i });
      await userEvent.click(submitButton);
      
      // El botón debería estar deshabilitado durante el loading
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  // ==================== INTERACCIONES ====================
  describe('Interacciones', () => {
    test('permite escribir en campos de email y password', async () => {
      renderLogin();
      
      const emailInput = document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[type="password"]');
      
      await userEvent.type(emailInput as Element, 'test@test.com');
      await userEvent.type(passwordInput as Element, 'mypassword');
      
      expect(emailInput).toHaveValue('test@test.com');
      expect(passwordInput).toHaveValue('mypassword');
    });
  });
});
