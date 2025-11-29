import { useState, useCallback } from 'react';
import { authService } from '../services';
import { parseAuthError } from '../utils';

/**
 * Hook principal para autenticación
 * Maneja login, register, logout y gestión de sesión
 */
export const useAuth = () => {
    const [user, setUser] = useState(() => authService.getUser());
    const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Iniciar sesión
     */
    const login = useCallback(async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.login(credentials);
            setUser(data.user);
            setIsAuthenticated(true);
            return { success: true, user: data.user };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Registrar nuevo usuario
     */
    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.register(userData);
            return { success: true, user: data.user };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Cerrar sesión
     */
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    }, []);

    /**
     * Actualizar perfil
     */
    const updateProfile = useCallback(async (profileData) => {
        setLoading(true);
        setError(null);

        try {
            const updatedUser = await authService.updateProfile(profileData);
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Cambiar contraseña
     */
    const changePassword = useCallback(async (passwordData) => {
        setLoading(true);
        setError(null);

        try {
            await authService.changePassword(passwordData);
            return { success: true };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Solicitar recuperación de contraseña
     */
    const forgotPassword = useCallback(async (email) => {
        setLoading(true);
        setError(null);

        try {
            await authService.forgotPassword(email);
            return { success: true };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Restablecer contraseña
     */
    const resetPassword = useCallback(async (resetData) => {
        setLoading(true);
        setError(null);

        try {
            await authService.resetPassword(resetData);
            return { success: true };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Verificar email
     */
    const verifyEmail = useCallback(async (token) => {
        setLoading(true);
        setError(null);

        try {
            await authService.verifyEmail(token);
            return { success: true };
        } catch (err) {
            const authError = parseAuthError(err);
            setError(authError.message);
            return { success: false, error: authError.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Refrescar token
     */
    const refreshToken = useCallback(async () => {
        try {
            await authService.refreshToken();
            return { success: true };
        } catch (err) {
            // Si falla el refresh, cerrar sesión
            logout();
            return { success: false };
        }
    }, [logout]);

    /**
     * Verificar si tiene un rol específico
     */
    const hasRole = useCallback((role) => {
        return authService.hasRole(role);
    }, []);

    /**
     * Verificar si tiene alguno de los roles
     */
    const hasAnyRole = useCallback((roles) => {
        return authService.hasAnyRole(roles);
    }, []);

    /**
     * Obtener rol del usuario
     */
    const getUserRole = useCallback(() => {
        return authService.getUserRole();
    }, []);

    return {
        // Estado
        user,
        isAuthenticated,
        loading,
        error,

        // Acciones de autenticación
        login,
        register,
        logout,

        // Gestión de perfil
        updateProfile,
        changePassword,

        // Recuperación de contraseña
        forgotPassword,
        resetPassword,

        // Verificación
        verifyEmail,
        refreshToken,

        // Utilidades de roles
        hasRole,
        hasAnyRole,
        getUserRole,
    };
};

export default useAuth;
