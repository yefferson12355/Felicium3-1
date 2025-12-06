// Prueba para verificar que los componentes esenciales se rendericen sin errores
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PanelPaciente from '../features/dashboard/components/PanelPaciente';
import PanelRecepcionista from '../features/dashboard/components/PanelRecepcionista';
import PanelDentista from '../features/dashboard/components/PanelDentista';
import PanelAdmin from '../features/dashboard/components/PanelAdmin';
import HomeScreen from '../components/HomeScreen';

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

describe('Pruebas de Renderizado de Componentes', () => {
  test('PanelPaciente debería renderizarse sin errores', async () => {
    render(<PanelPaciente />);
    // Esperar a que termine la carga
    await waitFor(() => {
      expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
    });
  });

  test('PanelRecepcionista debería renderizarse sin errores', async () => {
    render(<PanelRecepcionista />);
    await waitFor(() => {
      expect(screen.getByText(/recepcionista/i)).toBeInTheDocument();
    });
  });

  test('PanelDentista debería renderizarse sin errores', async () => {
    render(<PanelDentista />);
    await waitFor(() => {
      // El componente muestra "Panel de Dentista" no "Panel del Dentista"
      expect(screen.getByText(/panel de dentista/i)).toBeInTheDocument();
    });
  });

  test('PanelAdmin debería renderizarse sin errores', async () => {
    render(<PanelAdmin />);
    await waitFor(() => {
      // El componente muestra "Dashboard Administrativo" no "Panel Administrador"
      expect(screen.getByText(/dashboard administrativo/i)).toBeInTheDocument();
    });
  });

  test('HomeScreen debería renderizarse sin errores', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/clínica dental sonrisa perfecta/i)).toBeInTheDocument();
  });
});