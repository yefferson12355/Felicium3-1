// Prueba para verificar que los componentes esenciales se rendericen sin errores
import React from 'react';
import { render, screen } from '@testing-library/react';
import PanelPaciente from '../features/dashboard/components/PanelPaciente';
import PanelRecepcionista from '../features/dashboard/components/PanelRecepcionista';
import PanelDentista from '../features/dashboard/components/PanelDentista';
import PanelAdmin from '../features/dashboard/components/PanelAdmin';
import HomeScreen from '../components/HomeScreen';

describe('Pruebas de Renderizado de Componentes', () => {
  test('PanelPaciente debería renderizarse sin errores', () => {
    render(<PanelPaciente />);
    expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
  });

  test('PanelRecepcionista debería renderizarse sin errores', () => {
    render(<PanelRecepcionista />);
    expect(screen.getByText(/recepcionista/i)).toBeInTheDocument();
  });

  test('PanelDentista debería renderizarse sin errores', () => {
    render(<PanelDentista />);
    expect(screen.getByText(/panel del dentista/i)).toBeInTheDocument();
  });

  test('PanelAdmin debería renderizarse sin errores', () => {
    render(<PanelAdmin />);
    expect(screen.getByText(/panel administrador/i)).toBeInTheDocument();
  });

  test('HomeScreen debería renderizarse sin errores', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/clínica dental sonrisa perfecta/i)).toBeInTheDocument();
  });
});