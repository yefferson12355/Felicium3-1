import { Client } from 'pg'; // Importamos el driver de PostgreSQL
import { getConfig } from './app.config'; // <-- ¡Conexión! Importamos las variables

// Obtiene las variables de configuración
const config = getConfig();

/**
 * Objeto Cliente de PostgreSQL. Es la conexión real a la base de datos.
 */
export const pgClient = new Client({
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
export const connectDB = async (): Promise<void> => {
  try {
    await pgClient.connect();
    console.log("🟢 [DB] Conexión establecida con PostgreSQL.");
  } catch (error) {
    console.error("🔴 [DB] Error al conectar a PostgreSQL:", error);
    throw error; // Lanzamos el error para que server.ts detenga el inicio
  }
};