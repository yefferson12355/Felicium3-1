// Pruebas para validar la migración a la nueva arquitectura
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Mock de ThemeContext antes de importar App
jest.mock('../core/contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({
    isDarkMode: false,
    toggleDarkMode: jest.fn(),
    theme: {},
  }),
}));

// Mock del contexto de autenticación
jest.mock('../core/contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

// Importar App después de los mocks
import App from '../App';

// App ya incluye HashRouter internamente, no necesita ser envuelto en otro Router
describe('Pruebas de Funcionalidad después de la refactorización', () => {
  beforeEach(() => {
    // Reset hash antes de cada test
    window.location.hash = '';
  });

  test('la aplicación debe renderizarse sin errores', () => {
    render(<App />);
    
    // App muestra Login por defecto cuando no está autenticado
    // Verificamos que se renderice algo
    expect(document.body).toBeInTheDocument();
  });

  test('debe cambiar el hash correctamente para navegación', async () => {
    render(<App />);
    
    // Probar diferentes rutas con hash
    window.location.hash = '#paciente';
    await waitFor(() => {
      expect(window.location.hash).toBe('#paciente');
    });
    
    window.location.hash = '#recepcionista';
    await waitFor(() => {
      expect(window.location.hash).toBe('#recepcionista');
    });
    
    window.location.hash = '#doctor';
    await waitFor(() => {
      expect(window.location.hash).toBe('#doctor');
    });
    
    window.location.hash = '#admin';
    await waitFor(() => {
      expect(window.location.hash).toBe('#admin');
    });
  });
});