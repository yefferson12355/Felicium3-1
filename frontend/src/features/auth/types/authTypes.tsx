/**
 * Roles de Usuario
 */
export const USER_ROLES = {
    ADMIN: 'admin',
    DENTIST: 'dentista',
    RECEPTIONIST: 'recepcionista',
    PATIENT: 'paciente',
};

/**
 * Estados de Usuario
 */
export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    DELETED: 'deleted',
};

/**
 * Estados de Autenticación
 */
export const AUTH_STATUS = {
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    LOADING: 'loading',
    ERROR: 'error',
};

/**
 * Tipos de Errores de Autenticación
 */
export const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'invalid_credentials',
    USER_NOT_FOUND: 'user_not_found',
    EMAIL_ALREADY_EXISTS: 'email_already_exists',
    WEAK_PASSWORD: 'weak_password',
    TOKEN_EXPIRED: 'token_expired',
    TOKEN_INVALID: 'token_invalid',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    EMAIL_NOT_VERIFIED: 'email_not_verified',
    ACCOUNT_SUSPENDED: 'account_suspended',
    NETWORK_ERROR: 'network_error',
    SERVER_ERROR: 'server_error',
};

/**
 * Permisos por Rol
 */
export const ROLE_PERMISSIONS = {
    [USER_ROLES.ADMIN]: [
        'manage_users',
        'manage_appointments',
        'manage_patients',
        'manage_billing',
        'view_reports',
        'manage_settings',
        'manage_medical_records',
    ],
    [USER_ROLES.DENTIST]: [
        'view_appointments',
        'manage_own_appointments',
        'view_patients',
        'manage_medical_records',
        'view_billing',
    ],
    [USER_ROLES.RECEPTIONIST]: [
        'manage_appointments',
        'manage_patients',
        'view_billing',
        'create_appointments',
    ],
    [USER_ROLES.PATIENT]: [
        'view_own_appointments',
        'request_appointments',
        'view_own_medical_records',
        'view_own_billing',
    ],
};

/**
 * Requisitos de Contraseña
 */
export const PASSWORD_REQUIREMENTS = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Configuración de Sesión
 */
export const SESSION_CONFIG = {
    TOKEN_EXPIRY_HOURS: 24,
    REFRESH_TOKEN_EXPIRY_DAYS: 30,
    REMEMBER_ME_DAYS: 30,
    AUTO_LOGOUT_MINUTES: 60,
};

/**
 * Rutas de Autenticación
 */
export const AUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
    PROFILE: '/profile',
};

/**
 * Mensajes de Error en Español
 */
export const AUTH_ERROR_MESSAGES = {
    [AUTH_ERRORS.INVALID_CREDENTIALS]: 'Email o contraseña incorrectos',
    [AUTH_ERRORS.USER_NOT_FOUND]: 'Usuario no encontrado',
    [AUTH_ERRORS.EMAIL_ALREADY_EXISTS]: 'Este email ya está registrado',
    [AUTH_ERRORS.WEAK_PASSWORD]: 'La contraseña no cumple con los requisitos de seguridad',
    [AUTH_ERRORS.TOKEN_EXPIRED]: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
    [AUTH_ERRORS.TOKEN_INVALID]: 'Token inválido',
    [AUTH_ERRORS.UNAUTHORIZED]: 'No tienes autorización para realizar esta acción',
    [AUTH_ERRORS.FORBIDDEN]: 'Acceso denegado',
    [AUTH_ERRORS.EMAIL_NOT_VERIFIED]: 'Por favor, verifica tu email antes de continuar',
    [AUTH_ERRORS.ACCOUNT_SUSPENDED]: 'Tu cuenta ha sido suspendida. Contacta al administrador',
    [AUTH_ERRORS.NETWORK_ERROR]: 'Error de conexión. Verifica tu internet',
    [AUTH_ERRORS.SERVER_ERROR]: 'Error del servidor. Intenta nuevamente más tarde',
};

export default {
    USER_ROLES,
    USER_STATUS,
    AUTH_STATUS,
    AUTH_ERRORS,
    ROLE_PERMISSIONS,
    PASSWORD_REQUIREMENTS,
    SESSION_CONFIG,
    AUTH_ROUTES,
    AUTH_ERROR_MESSAGES,
};
