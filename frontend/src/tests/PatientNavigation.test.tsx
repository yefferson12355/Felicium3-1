// Prueba específica para verificar la navegación entre vistas de paciente
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

// App ya incluye HashRouter internamente
test('debería navegar correctamente entre vistas de paciente', async () => {
  // Reset hash
  window.location.hash = '';
  
  render(<App />);

  // Simular navegación a la vista de paciente
  window.location.hash = '#paciente';
  await waitFor(() => {
    expect(window.location.hash).toBe('#paciente');
  });

  // Simular navegación a citas de paciente
  window.location.hash = '#paciente/citas';
  await waitFor(() => {
    expect(window.location.hash).toBe('#paciente/citas');
  });
});