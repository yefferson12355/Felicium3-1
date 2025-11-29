"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
/**
 * Middleware para verificar Roles (RBAC)
 * @param allowedRoles Array de roles permitidos (ej: ['ADMIN', 'DOCTOR'])
 */
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        // 1. Obtenemos el usuario que el 'authMiddleware' debió haber inyectado antes
        // (Usamos 'as any' porque Express por defecto no trae la propiedad .user)
        const user = req.user;
        // Si por alguna razón no hay usuario (falló el auth middleware), denegamos
        if (!user) {
            return res.status(401).json({ message: 'Acceso denegado. Usuario no identificado.' });
        }
        // 2. Verificamos si el rol del usuario está en la lista de permitidos
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: `Acceso prohibido. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}`
            });
        }
        // 3. Si todo está bien, pase usted
        next();
    };
};
exports.requireRole = requireRole;
