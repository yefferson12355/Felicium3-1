"use strict";
// src/interfaces/http/middlewares/auth.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.verifyToken = void 0;
const JwtService_1 = require("../../../infrastructure/auth/JwtService");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere autenticación.' });
    }
    try {
        // 1. Verificar y decodificar el token usando el servicio de Infraestructura
        const decodedUser = (0, JwtService_1.verifyToken)(token);
        // 2. Adjuntar el usuario decodificado a la petición
        req.user = decodedUser;
        // 3. Continuar con la siguiente función (Controller o otro Middleware)
        next();
    }
    catch (error) {
        // Si la verificación falla (token expirado o inválido)
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};
exports.verifyToken = verifyToken;
/**
 * authMiddleware - Alias for use in app.use()
 */
exports.authMiddleware = exports.verifyToken;
