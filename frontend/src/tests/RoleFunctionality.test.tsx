// Prueba para verificar la funcionalidad de cada rol de usuario
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import RoleBasedRouter from '../routes/RoleBasedRouter';

describe('Pruebas por Rol de Usuario', () => {
  test('debería renderizar correctamente el panel del paciente', async () => {
    render(
      <HashRouter>
        <RoleBasedRouter role="paciente" userName="Juan Pérez" />
      </HashRouter>
    );

    // Verificar que se muestre el panel del paciente
    expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument();
  });

  test('debería renderizar correctamente el panel del recepcionista', async () => {
    render(
      <HashRouter>
        <RoleBasedRouter role="recepcionista" userName="María García" />
      </HashRouter>
    );

    // Verificar que se muestre el panel del recepcionista
    expect(screen.getByText(/recepcionista/i)).toBeInTheDocument();
  });

  test('debería renderizar correctamente el panel del dentista', async () => {
    render(
      <HashRouter>
        <RoleBasedRouter role="dentista" userName="Dr. Carlos López" />
      </HashRouter>
    );

    // Verificar que se muestre el panel del dentista
    expect(screen.getByText(/dentista/i)).toBeInTheDocument();
  });

  test('debería renderizar correctamente el panel del admin', async () => {
    render(
      <HashRouter>
        <RoleBasedRouter role="admin" userName="Ana Martínez" />
      </HashRouter>
    );

    // Verificar que se muestre el panel del admin
    expect(screen.getByText(/administrador/i)).toBeInTheDocument();
  });
});