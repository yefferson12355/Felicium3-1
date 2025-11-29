import { USER_ROLES } from './authTypes';

/**
 * Configuración de roles con metadata
 */
export const ROLE_CONFIG = {
    [USER_ROLES.ADMIN]: {
        label: 'Administrador',
        color: '#9C27B0',
        bgColor: '#F3E5F5',
        icon: '👑',
        description: 'Acceso completo al sistema',
        priority: 1,
    },
    [USER_ROLES.DENTIST]: {
        label: 'Dentista',
        color: '#2196F3',
        bgColor: '#E3F2FD',
        icon: '🦷',
        description: 'Gestión de citas y historiales médicos',
        priority: 2,
    },
    [USER_ROLES.RECEPTIONIST]: {
        label: 'Recepcionista',
        color: '#FF9800',
        bgColor: '#FFF3E0',
        icon: '📋',
        description: 'Gestión de citas y pacientes',
        priority: 3,
    },
    [USER_ROLES.PATIENT]: {
        label: 'Paciente',
        color: '#4CAF50',
        bgColor: '#E8F5E9',
        icon: '👤',
        description: 'Acceso a citas e historial personal',
        priority: 4,
    },
};

/**
 * Obtener configuración de un rol
 * @param {string} role - Rol del usuario
 * @returns {Object} Configuración del rol
 */
export const getRoleConfig = (role) => {
    return ROLE_CONFIG[role] || ROLE_CONFIG[USER_ROLES.PATIENT];
};

/**
 * Obtener label de un rol
 * @param {string} role - Rol del usuario
 * @returns {string} Label del rol
 */
export const getRoleLabel = (role) => {
    return getRoleConfig(role).label;
};

/**
 * Obtener color de un rol
 * @param {string} role - Rol del usuario
 * @returns {string} Color del rol
 */
export const getRoleColor = (role) => {
    return getRoleConfig(role).color;
};

/**
 * Obtener icono de un rol
 * @param {string} role - Rol del usuario
 * @returns {string} Icono del rol
 */
export const getRoleIcon = (role) => {
    return getRoleConfig(role).icon;
};

/**
 * Verificar si un rol es admin
 * @param {string} role - Rol a verificar
 * @returns {boolean} True si es admin
 */
export const isAdmin = (role) => {
    return role === USER_ROLES.ADMIN;
};

/**
 * Verificar si un rol es dentista
 * @param {string} role - Rol a verificar
 * @returns {boolean} True si es dentista
 */
export const isDentist = (role) => {
    return role === USER_ROLES.DENTIST;
};

/**
 * Verificar si un rol es recepcionista
 * @param {string} role - Rol a verificar
 * @returns {boolean} True si es recepcionista
 */
export const isReceptionist = (role) => {
    return role === USER_ROLES.RECEPTIONIST;
};

/**
 * Verificar si un rol es paciente
 * @param {string} role - Rol a verificar
 * @returns {boolean} True si es paciente
 */
export const isPatient = (role) => {
    return role === USER_ROLES.PATIENT;
};

/**
 * Verificar si un rol es staff (admin, dentista o recepcionista)
 * @param {string} role - Rol a verificar
 * @returns {boolean} True si es staff
 */
export const isStaff = (role) => {
    return [USER_ROLES.ADMIN, USER_ROLES.DENTIST, USER_ROLES.RECEPTIONIST].includes(role);
};

/**
 * Obtener todos los roles ordenados por prioridad
 * @returns {Array} Lista de roles
 */
export const getAllRoles = () => {
    return Object.values(USER_ROLES).sort((a, b) => {
        return getRoleConfig(a).priority - getRoleConfig(b).priority;
    });
};

export default {
    ROLE_CONFIG,
    getRoleConfig,
    getRoleLabel,
    getRoleColor,
    getRoleIcon,
    isAdmin,
    isDentist,
    isReceptionist,
    isPatient,
    isStaff,
    getAllRoles,
};
