"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config"); // Importamos tu configuración para leer el secreto
// Obtenemos la CLAVE SECRETA del .env (la "tinta especial" para firmar)
const config = (0, app_config_1.getConfig)();
const SECRET = config.jwtSecret;
/**
 * MÁQUINA 1: Generar Token (Firmar)
 * Se usa cuando el usuario hace LOGIN exitoso.
 * @param payload Los datos del usuario (ID, Rol)
 * @returns El string del token (el brazalete)
 */
const generateToken = (payload) => {
    // Crea un token que expira en 24 horas
    return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};
exports.generateToken = generateToken;
/**
 * MÁQUINA 2: Verificar Token (Leer)
 * Se usa en el Middleware para ver si el usuario puede pasar.
 * @param token El string del token que envió el usuario
 * @returns Los datos que había dentro (UserPayload)
 */
const verifyToken = (token) => {
    try {
        // Intenta desencriptar usando nuestra CLAVE SECRETA.
        // Si el token fue modificado por un hacker o expiró, esto lanza un error.
        return jwt.verify(token, SECRET);
    }
    catch (error) {
        throw new Error('Token inválido o expirado');
    }
};
exports.verifyToken = verifyToken;
