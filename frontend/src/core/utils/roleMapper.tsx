/**
 * Role Mapper - Utilidades para mapeo de roles
 * Centraliza la lógica de conversión entre códigos de rol y textos legibles
 */

import type { UserRole } from '../types/dtos';

export const ROLE_CODES = {
  ADMIN: 'ADMIN',
  DENTIST: 'DENTIST',
  RECEPTIONIST: 'RECEPTIONIST',
  PATIENT: 'PATIENT',
} as const;

export const ROLE_ROUTES: Record<UserRole, string> = {
  ADMIN: 'admin',
  DENTIST: 'dentista',
  RECEPTIONIST: 'recepcionista',
  PATIENT: 'paciente',
};

export const ROLE_LABELS: Record<string, string> = {
  'admin': 'Administrador',
  'dentista': 'Dentista',
  'doctor': 'Dentista',
  'recepcionista': 'Recepcionista',
  'paciente': 'Paciente',
};

/**
 * Convierte un código de rol de backend a ruta de frontend
 * @param {string} roleCode - Código de rol del backend (ADMIN, DENTIST, etc)
 * @returns {string} - Ruta del frontend (admin, dentista, etc)
 */
export const getRoleRoute = (roleCode: UserRole): string => {
  return ROLE_ROUTES[roleCode] || 'paciente';
};

/**
 * Convierte una ruta de rol a texto legible
 * @param {string} route - Ruta del rol (admin, dentista, etc)
 * @returns {string} - Texto legible (Administrador, Dentista, etc)
 */
export const getRoleLabel = (route: string): string => {
  return ROLE_LABELS[route] || route.charAt(0).toUpperCase() + route.slice(1);
};

/**
 * Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales (máximo 2 caracteres)
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
