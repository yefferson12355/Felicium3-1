import app from './app'; // Importa la aplicación configurada (el motor)
import { connectDB } from './infrastructure/config/database.config'; // <-- Dependemos de este archivo
import { getConfig } from './infrastructure/config/app.config';

// Obtenemos la configuración del puerto desde la infraestructura
const { port } = getConfig(); // Asumimos que getConfig() lee el puerto del .env

/**
 * Función asíncrona principal que arranca el servidor
 * Aquí se manejan los errores de conexión de forma centralizada.
 */
async function startServer() {
  try {
    // 1. CONEXIÓN A LA BASE DE DATOS
    // Llamamos a la función que conecta a Postgres (esta función la crearemos luego)
    await connectDB(); 
    console.log("✅ Base de Datos Conectada exitosamente.");

    // 2. ENCENDER EL SERVIDOR WEB
    app.listen(port, () => {
      console.log(`🚀 Servidor de la Clínica corriendo en http://localhost:${port}`);
      console.log("---------------------------------------------------------");
    });

  } catch (error) {
    console.error("❌ ERROR CRÍTICO al iniciar el servidor:", error);
    // Un error en el inicio (ej: DB caída) debe detener el proceso
    process.exit(1); 
  }
}

startServer(); // Llamamos a la función para iniciar