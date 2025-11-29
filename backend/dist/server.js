"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Importa la aplicación configurada (el motor)
const database_config_1 = require("./infrastructure/config/database.config"); // <-- Dependemos de este archivo
const app_config_1 = require("./infrastructure/config/app.config");
// Obtenemos la configuración del puerto desde la infraestructura
const { port } = (0, app_config_1.getConfig)(); // Asumimos que getConfig() lee el puerto del .env
/**
 * Función asíncrona principal que arranca el servidor
 * Aquí se manejan los errores de conexión de forma centralizada.
 */
async function startServer() {
    try {
        // 1. CONEXIÓN A LA BASE DE DATOS
        // Llamamos a la función que conecta a Postgres (esta función la crearemos luego)
        await (0, database_config_1.connectDB)();
        console.log("✅ Base de Datos Conectada exitosamente.");
        // 2. ENCENDER EL SERVIDOR WEB
        const server = app_1.default.listen(port, () => {
            console.log(`🚀 Servidor de la Clínica corriendo en http://localhost:${port}`);
            console.log("---------------------------------------------------------");
        });
        // Manejo de errores del servidor
        server.on('error', (err) => {
            console.error("❌ ERROR en el servidor:", err);
        });
    }
    catch (error) {
        console.error("❌ ERROR CRÍTICO al iniciar el servidor:", error);
        // Un error en el inicio (ej: DB caída) debe detener el proceso
        process.exit(1);
    }
}
startServer(); // Llamamos a la función para iniciar
