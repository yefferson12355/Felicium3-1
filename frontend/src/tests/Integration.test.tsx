// Pruebas de integración para verificar la interacción entre componentes de diferentes módulos
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RoleBasedRouter from '../routes/RoleBasedRouter';

// Mock de servicios de API
jest.mock('../core/services/api/appointmentService', () => ({
  appointmentService: {
    getAll: jest.fn(() => Promise.resolve({ appointments: [] })),
  },
}));

jest.mock('../core/services/api/patientService', () => ({
  patientService: {
    getAll: jest.fn(() => Promise.resolve([])),
  },
}));

jest.mock('../core/services/api/dashboardService', () => ({
  dashboardService: {
    getOverview: jest.fn(() => Promise.resolve({ appointmentsToday: 5, newPatientsMonth: 3, totalRevenueMonth: 1000 })),
  },
}));

// Mock del contexto de autenticación para UserProfile
jest.mock('../core/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { 
      id: 1, 
      firstName: 'Juan', 
      lastName: 'Pérez', 
      email: 'juan@test.com',
      role: 'paciente'
    },
    logout: jest.fn(),
    updateUserProfile: jest.fn(() => Promise.resolve({ success: true })),
  }),
}));

describe('Pruebas de Integración', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  test('La navegación entre vistas del paciente debería funcionar', async () => {
    window.location.hash = '#paciente';
    const { rerender } = render(
      <RoleBasedRouter role="paciente" userName="Juan Pérez" />
    );
    
    // Verificar que el panel del paciente se renderice correctamente
    await waitFor(() => {
      expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
    });
    
    // Cambiar a la vista de perfil
    window.location.hash = '#perfil';
    
    rerender(
      <RoleBasedRouter role="paciente" userName="Juan Pérez" />
    );
    
    // Verificar que la vista de perfil se muestre
    await waitFor(() => {
      expect(screen.getByText(/mi perfil/i)).toBeInTheDocument();
    });
  });

  test('La navegación entre vistas del dentista debería funcionar', async () => {
    window.location.hash = '#dentista';
    render(
      <RoleBasedRouter role="dentista" userName="Dr. Carlos López" />
    );
    
    // Verificar que el panel del dentista se renderice correctamente
    await waitFor(() => {
      expect(screen.getByText(/panel de dentista/i)).toBeInTheDocument();
    });
  });
});