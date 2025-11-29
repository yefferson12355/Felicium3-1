/**
 * DTOs de Authentication - Copiados del Backend
 * Backend: backend/src/interfaces/http/dtos/auth/
 */

export type UserRole = 'ADMIN' | 'DENTIST' | 'RECEPTIONIST' | 'PATIENT';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface LoginResponseDTO {
  user: UserResponseDTO;
  token: string;
  expiresIn?: number;
}
