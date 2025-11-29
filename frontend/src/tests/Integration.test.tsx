// Pruebas de integración para verificar la interacción entre componentes de diferentes módulos
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import RoleBasedRouter from '../routes/RoleBasedRouter';

describe('Pruebas de Integración', () => {
  test('La autenticación debería funcionar en todas las vistas protegidas', async () => {
    const { rerender } = render(
      <HashRouter>
        <RoleBasedRouter role="paciente" userName="Juan Pérez" />
      </HashRouter>
    );
    
    // Verificar que el panel del paciente se renderice correctamente
    expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
    
    // Cambiar a la vista de perfil
    window.location.hash = '#perfil';
    await waitFor(() => {
      expect(window.location.hash).toBe('#perfil');
    });
    
    rerender(
      <HashRouter>
        <RoleBasedRouter role="paciente" userName="Juan Pérez" />
      </HashRouter>
    );
    
    // Verificar que la vista de perfil se muestre
    expect(screen.getByText(/mi perfil/i)).toBeInTheDocument();
  });

  test('La navegación entre vistas del dentista debería funcionar', async () => {
    const { rerender } = render(
      <HashRouter>
        <RoleBasedRouter role="dentista" userName="Dr. Carlos López" />
      </HashRouter>
    );
    
    // Verificar que el panel del dentista se renderice correctamente
    expect(screen.getByText(/dentista/i)).toBeInTheDocument();
    
    // Cambiar a la vista de pacientes del dentista
    window.location.hash = '#dentista/pacientes';
    await waitFor(() => {
      expect(window.location.hash).toBe('#dentista/pacientes');
    });
    
    rerender(
      <HashRouter>
        <RoleBasedRouter role="dentista" userName="Dr. Carlos López" />
      </HashRouter>
    );
    
    // Verificar que se muestre la vista de pacientes del dentista
    expect(screen.getByText(/gestion pacientes dentista/i)).toBeInTheDocument();
  });
});