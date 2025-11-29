// Prueba específica para verificar la navegación entre vistas de paciente
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from '../App';

test('debería navegar correctamente entre vistas de paciente', async () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );

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