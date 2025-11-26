import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

// Importamos SOLO el Router Principal
import { mainRouter } from './interfaces/http/routes/index.routes'; 
import { errorHandler } from './interfaces/http/middlewares/error-handler.middleware';

const app: Application = express();

app.use(helmet());  // Seguridad básica con Helmet
app.use(cors());  // Habilita CORS para todas las rutas
app.use(express.json());  // Parseo de JSON en el body

// Este es el "Chismoso". Nos dirá si alguien toca la puerta.
app.use((req, res, next) => {
    console.log(`📨 PETICIÓN ENTRANDO: ${req.method} ${req.url}`);
    console.log("📦 Datos recibidos:", req.body);
    next();
});
// Le decimos a la app: "Todo lo que empiece con /api, búscalo en el mapa principal"
app.use('/api', mainRouter); 

app.use(errorHandler); 

export default app;