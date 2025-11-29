import { ROLE_PERMISSIONS } from '../types';

/**
 * Verificar si un usuario tiene un permiso específico
 * @param {string} userRole - Rol del usuario
 * @param {string} permission - Permiso a verificar
 * @returns {boolean} True si tiene el permiso
 */
export const hasPermission = (userRole, permission) => {
    if (!userRole || !permission) return false;
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
};

/**
 * Verificar si un usuario tiene todos los permisos especificados
 * @param {string} userRole - Rol del usuario
 * @param {Array<string>} permissions - Permisos a verificar
 * @returns {boolean} True si tiene todos los permisos
 */
export const hasAllPermissions = (userRole, permissions) => {
    if (!userRole || !permissions || !Array.isArray(permissions)) return false;
    return permissions.every(permission => hasPermission(userRole, permission));
};

/**
 * Verificar si un usuario tiene alguno de los permisos especificados
 * @param {string} userRole - Rol del usuario
 * @param {Array<string>} permissions - Permisos a verificar
 * @returns {boolean} True si tiene al menos un permiso
 */
export const hasAnyPermission = (userRole, permissions) => {
    if (!userRole || !permissions || !Array.isArray(permissions)) return false;
    return permissions.some(permission => hasPermission(userRole, permission));
};

/**
 * Obtener todos los permisos de un rol
 * @param {string} userRole - Rol del usuario
 * @returns {Array<string>} Lista de permisos
 */
export const getRolePermissions = (userRole) => {
    return ROLE_PERMISSIONS[userRole] || [];
};

/**
 * Verificar si un usuario puede acceder a una ruta
 * @param {string} userRole - Rol del usuario
 * @param {string} route - Ruta a verificar
 * @param {Object} routePermissions - Mapa de rutas y permisos requeridos
 * @returns {boolean} True si puede acceder
 */
export const canAccessRoute = (userRole, route, routePermissions = {}) => {
    const requiredPermissions = routePermissions[route];

    if (!requiredPermissions) {
        return true; // Ruta pública
    }

    if (Array.isArray(requiredPermissions)) {
        return hasAnyPermission(userRole, requiredPermissions);
    }

    return hasPermission(userRole, requiredPermissions);
};

/**
 * Filtrar rutas accesibles para un rol
 * @param {string} userRole - Rol del usuario
 * @param {Array} routes - Lista de rutas
 * @param {Object} routePermissions - Mapa de rutas y permisos
 * @returns {Array} Rutas accesibles
 */
export const getAccessibleRoutes = (userRole, routes, routePermissions = {}) => {
    return routes.filter(route => canAccessRoute(userRole, route.path, routePermissions));
};

export default {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    getRolePermissions,
    canAccessRoute,
    getAccessibleRoutes,
};
