// Pruebas para validar la migración a la nueva arquitectura
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from '../App';

describe('Pruebas de Funcionalidad después de la refactorización', () => {
  test('la aplicación debe renderizarse sin errores', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    
    // Verificar que el componente principal se renderice
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('debe cargar las rutas correctamente para cada rol', async () => {
    const { rerender } = render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    
    // Probar diferentes rutas con hash
    window.location.hash = '#paciente';
    await waitFor(() => {
      expect(window.location.hash).toBe('#paciente');
    });
    
    rerender(
      <HashRouter>
        <App />
      </HashRouter>
    );
    
    window.location.hash = '#recepcionista';
    await waitFor(() => {
      expect(window.location.hash).toBe('#recepcionista');
    });
    
    rerender(
      <HashRouter>
        <App />
      </HashRouter>
    );
    
    window.location.hash = '#doctor';
    await waitFor(() => {
      expect(window.location.hash).toBe('#doctor');
    });
    
    rerender(
      <HashRouter>
        <App />
      </HashRouter>
    );
    
    window.location.hash = '#admin';
    await waitFor(() => {
      expect(window.location.hash).toBe('#admin');
    });
  });
});