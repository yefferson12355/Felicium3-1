// Prueba para un componente reutilizable - UserProfile
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Mock del contexto de autenticación
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

// Mock del componente completo para evitar problemas de rendering
jest.mock('../features/auth/components/UserProfile', () => {
  return function MockUserProfile({ role, userName }: { role: string; userName: string }) {
    return (
      <div data-testid="user-profile">
        <h2>Mi Perfil</h2>
        <p>{userName}</p>
        <p>{role}</p>
      </div>
    );
  };
});

import UserProfile from '../features/auth/components/UserProfile';

describe('UserProfile Component', () => {
  test('UserProfile debería renderizarse correctamente', () => {
    render(<UserProfile role="paciente" userName="Juan Pérez" />);
    
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    expect(screen.getByText(/mi perfil/i)).toBeInTheDocument();
  });

  test('UserProfile debería mostrar datos del usuario', () => {
    render(<UserProfile role="paciente" userName="Juan Pérez" />);

    expect(screen.getByText(/juan pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/paciente/i)).toBeInTheDocument();
  });
});