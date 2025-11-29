"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
//Padre de todos los errores de dominio
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
    }
}
exports.DomainError = DomainError;
