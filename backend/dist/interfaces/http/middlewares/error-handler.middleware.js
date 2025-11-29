"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// CORRECCIÓN DE RUTA:
// ../ (sales a http)
// ../ (sales a interfaces)
// ../ (sales a src)
// ./shared/errors (entras a shared/errors)
// Al tener el index.ts, ya no necesitas especificar el nombre del archivo
const errors_1 = require("../../../shared/errors");
const errorHandler = (err, req, res, next) => {
    // ... (El resto de tu código está perfecto, déjalo igual)
    let statusCode = 500;
    let message = 'Error interno del servidor. Por favor, contacte a soporte.';
    if (err instanceof errors_1.ValidationError || err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }
    else if (err instanceof errors_1.NotFoundError || err.name === 'NotFoundError') {
        statusCode = 404;
        message = err.message;
    }
    else if (err.isJoi || err.code === '23505') {
        statusCode = 409;
        message = 'El recurso ya existe (DNI o email duplicado).';
    }
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
exports.errorHandler = errorHandler;
