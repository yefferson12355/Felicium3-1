"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ... (imports y middlewares) ...
const index_routes_1 = require("./interfaces/http/routes/index.routes");
const error_handler_middleware_1 = require("./interfaces/http/middlewares/error-handler.middleware");
/**
 * Función que configura la aplicación Express
 */
const app = (0, express_1.default)();
// --- Middlewares de Parseo y Seguridad ---
// JSON parser middleware
app.use(express_1.default.json({ limit: '50mb' }));
// URL-encoded parser middleware
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// CORS headers (basic)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// --- Ensamblaje de Rutas ---
// Montamos el router principal con todas las rutas (auth, pacientes, citas, odontogramas)
app.use('/api', index_routes_1.mainRouter);
// Middleware de Manejo de Errores (DEBE ir al final)
app.use(error_handler_middleware_1.errorHandler);
exports.default = app;
