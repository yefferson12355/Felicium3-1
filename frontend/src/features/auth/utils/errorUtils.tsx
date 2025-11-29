import { AUTH_ERRORS, AUTH_ERROR_MESSAGES } from '../types';

/**
 * Parsear error de autenticación
 * @param {Error} error - Error a parsear
 * @returns {Object} { type: string, message: string }
 */
export const parseAuthError = (error) => {
    if (!error) {
        return {
            type: AUTH_ERRORS.SERVER_ERROR,
            message: AUTH_ERROR_MESSAGES[AUTH_ERRORS.SERVER_ERROR],
        };
    }

    // Error de red
    if (!error.response) {
        return {
            type: AUTH_ERRORS.NETWORK_ERROR,
            message: AUTH_ERROR_MESSAGES[AUTH_ERRORS.NETWORK_ERROR],
        };
    }

    const { status, data } = error.response;

    // Mapear códigos de estado HTTP a tipos de error
    switch (status) {
        case 400:
            return {
                type: data.code || AUTH_ERRORS.INVALID_CREDENTIALS,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.INVALID_CREDENTIALS],
            };

        case 401:
            return {
                type: AUTH_ERRORS.UNAUTHORIZED,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.UNAUTHORIZED],
            };

        case 403:
            return {
                type: AUTH_ERRORS.FORBIDDEN,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.FORBIDDEN],
            };

        case 404:
            return {
                type: AUTH_ERRORS.USER_NOT_FOUND,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.USER_NOT_FOUND],
            };

        case 409:
            return {
                type: AUTH_ERRORS.EMAIL_ALREADY_EXISTS,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.EMAIL_ALREADY_EXISTS],
            };

        case 422:
            return {
                type: data.code || AUTH_ERRORS.WEAK_PASSWORD,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.WEAK_PASSWORD],
            };

        default:
            return {
                type: AUTH_ERRORS.SERVER_ERROR,
                message: data.message || AUTH_ERROR_MESSAGES[AUTH_ERRORS.SERVER_ERROR],
            };
    }
};

/**
 * Obtener mensaje de error amigable
 * @param {string} errorType - Tipo de error
 * @returns {string} Mensaje de error
 */
export const getErrorMessage = (errorType) => {
    return AUTH_ERROR_MESSAGES[errorType] || AUTH_ERROR_MESSAGES[AUTH_ERRORS.SERVER_ERROR];
};

/**
 * Verificar si un error es de autenticación
 * @param {Error} error - Error a verificar
 * @returns {boolean} True si es error de autenticación
 */
export const isAuthError = (error) => {
    if (!error || !error.response) return false;
    const { status } = error.response;
    return status === 401 || status === 403;
};

/**
 * Verificar si un error requiere re-login
 * @param {Error} error - Error a verificar
 * @returns {boolean} True si requiere re-login
 */
export const requiresReLogin = (error) => {
    const { type } = parseAuthError(error);
    return [
        AUTH_ERRORS.TOKEN_EXPIRED,
        AUTH_ERRORS.TOKEN_INVALID,
        AUTH_ERRORS.UNAUTHORIZED,
    ].includes(type);
};

export default {
    parseAuthError,
    getErrorMessage,
    isAuthError,
    requiresReLogin,
};
