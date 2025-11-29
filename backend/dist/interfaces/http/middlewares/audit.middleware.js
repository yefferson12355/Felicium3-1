"use strict";
// src/interfaces/http/middlewares/audit.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditMiddleware = void 0;
// Asumimos que tienes una función global para loguear, o solo usamos console.log
const logger = console.log;
const auditMiddleware = (req, res, next) => {
    const startTime = Date.now(); // Marca de tiempo de inicio
    const url = req.originalUrl;
    const method = req.method;
    // Intentamos obtener el ID del usuario del token (adjuntado por authMiddleware)
    const userId = req.user ? req.user.id : 'GUEST';
    // Continuar con el flujo normal de la aplicación
    next();
    // Escuchar el evento 'finish' (cuando la respuesta se envía al cliente)
    res.on('finish', () => {
        const duration = Date.now() - startTime; // Calcula el tiempo total
        const statusCode = res.statusCode; // Código de respuesta (200, 400, 500, etc.)
        // Registra el evento completo
        logger(`[AUDIT] ${method}:${url} - USER:${userId} - STATUS:${statusCode} - TIME:${duration}ms`);
    });
};
exports.auditMiddleware = auditMiddleware;
