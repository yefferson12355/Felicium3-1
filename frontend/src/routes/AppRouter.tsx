import { patientRoutes } from './roleRoutes/patientRoutes';
import { receptionistRoutes } from './roleRoutes/receptionistRoutes';
import { dentistRoutes } from './roleRoutes/dentistRoutes';
import { adminRoutes } from './roleRoutes/adminRoutes';
import Login from '../features/auth/components/Login';
import HomeScreen from '../components/HomeScreen';
import UserProfile from '../features/auth/components/UserProfile';

// Combinar todas las rutas
const allRoutes = {
  // Rutas públicas
  '/': HomeScreen,
  '#': HomeScreen,
  '/login': Login,
  '#login': Login,
  '/perfil': UserProfile,
  '#perfil': UserProfile,

  // Rutas por roles - se usarán según el rol del usuario
  ...patientRoutes,
  ...receptionistRoutes,
  ...dentistRoutes,
  ...adminRoutes,
};

export default allRoutes;