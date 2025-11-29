import { hasPermission, hasAllPermissions, hasAnyPermission } from '../utils';
import { authService } from '../services';

/**
 * Hook para verificación de permisos
 * Simplifica la verificación de permisos basada en roles
 */
export const usePermissions = () => {
    const userRole = authService.getUserRole();

    /**
     * Verificar si tiene un permiso específico
     */
    const can = (permission) => {
        return hasPermission(userRole, permission);
    };

    /**
     * Verificar si tiene todos los permisos
     */
    const canAll = (permissions) => {
        return hasAllPermissions(userRole, permissions);
    };

    /**
     * Verificar si tiene alguno de los permisos
     */
    const canAny = (permissions) => {
        return hasAnyPermission(userRole, permissions);
    };

    /**
     * Verificar si NO tiene un permiso
     */
    const cannot = (permission) => {
        return !can(permission);
    };

    return {
        can,
        canAll,
        canAny,
        cannot,
        userRole,
    };
};

export default usePermissions;
