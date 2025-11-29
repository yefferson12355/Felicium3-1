"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.pgClient = void 0;
const pg_1 = require("pg"); // Importamos el driver de PostgreSQL
const app_config_1 = require("./app.config"); // <-- ¡Conexión! Importamos las variables
// Obtiene las variables de configuración
const config = (0, app_config_1.getConfig)();
/**
 * Objeto Cliente de PostgreSQL. Es la conexión real a la base de datos.
 */
exports.pgClient = new pg_1.Client({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: 5432, // Usamos el puerto estándar de PostgreSQL
});
/**
 * Función que establece la conexión a la base de datos.
 * Esta es la función que tu archivo 'server.ts' está esperando (await connectDB()).
 * @returns {Promise<void>} Una promesa que se resuelve al conectar.
 */
const connectDB = async () => {
    try {
        await exports.pgClient.connect();
        console.log("🟢 [DB] Conexión establecida con PostgreSQL.");
    }
    catch (error) {
        console.error("🔴 [DB] Error al conectar a PostgreSQL:", error);
        throw error; // Lanzamos el error para que server.ts detenga el inicio
    }
};
exports.connectDB = connectDB;
