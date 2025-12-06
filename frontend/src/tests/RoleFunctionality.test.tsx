// Prueba para verificar la funcionalidad de cada rol de usuario
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

describe('Pruebas por Rol de Usuario', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  test('debería renderizar correctamente el panel del paciente', async () => {
    window.location.hash = '#paciente';
    render(<RoleBasedRouter role="paciente" userName="Juan Pérez" />);

    // Esperar a que termine la carga asíncrona
    await waitFor(() => {
      expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
    });
  });

  test('debería renderizar correctamente el panel del recepcionista', async () => {
    window.location.hash = '#recepcionista';
    render(<RoleBasedRouter role="recepcionista" userName="María García" />);

    await waitFor(() => {
      expect(screen.getByText(/recepcionista/i)).toBeInTheDocument();
    });
  });

  test('debería renderizar correctamente el panel del dentista', async () => {
    window.location.hash = '#dentista';
    render(<RoleBasedRouter role="dentista" userName="Dr. Carlos López" />);

    await waitFor(() => {
      // El componente muestra "Panel de Dentista"
      expect(screen.getByText(/panel de dentista/i)).toBeInTheDocument();
    });
  });

  test('debería renderizar correctamente el panel del admin', async () => {
    window.location.hash = '#admin';
    render(<RoleBasedRouter role="admin" userName="Ana Martínez" />);

    await waitFor(() => {
      // El componente muestra "Dashboard Administrativo"
      expect(screen.getByText(/dashboard administrativo/i)).toBeInTheDocument();
    });
  });
});