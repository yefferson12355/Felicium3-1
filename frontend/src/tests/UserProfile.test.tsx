// Prueba para un componente reutilizable - UserProfile
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserProfile from '../features/auth/components/UserProfile';

test('UserProfile debería renderizarse correctamente', () => {
  const { getByText } = render(<UserProfile role="paciente" userName="Juan Pérez" />);

  expect(getByText(/mi perfil/i)).toBeInTheDocument();
  expect(getByText(/juan perez/i)).toBeInTheDocument();
});

test('UserProfile debería cambiar a modo edición cuando se hace clic en editar', () => {
  render(<UserProfile role="paciente" userName="Juan Pérez" />);

  const editButton = screen.getByText(/editar perfil/i);
  fireEvent.click(editButton);

  // Verificar que los campos de entrada aparezcan después de hacer clic en editar
  expect(screen.getByRole('textbox', { name: /nombre completo/i })).toBeInTheDocument();
});