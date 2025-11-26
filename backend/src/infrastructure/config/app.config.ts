import 'dotenv/config'; // Asegura que el archivo .env se cargue

/**
 * Define la interfaz de configuración de la aplicación
 * para mantener el código fuertemente tipado.
 */
interface AppConfig {
  port: number;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  jwtSecret: string;
}

/**
 * Función que lee las variables de entorno y las devuelve tipadas.
 * @returns {AppConfig} El objeto de configuración de la aplicación.
 */
export const getConfig = (): AppConfig => {
  // Es buena práctica asegurarse de que las variables críticas existan
  if (!process.env.PORT || !process.env.DB_HOST) {
    console.error("❌ ERROR CRÍTICO: Variables de entorno DB_HOST o PORT no están definidas.");
    process.exit(1); // Detiene la aplicación si falta una configuración vital
  }
  
  return {
    // Configuraciones de Servidor
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET || 'mi_secreto_super_seguro',
    
    // Configuraciones de Base de Datos
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'secret',
    dbName: process.env.DB_NAME || 'dental_db',
  };
};