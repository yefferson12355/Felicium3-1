// (Código omitido: Importaciones de Repositorio y Casos de Uso)

// Importamos todos los Controladores para crear sus instancias
import { PatientController } from '../interfaces/http/controllers/patient.controller';
//import { AppointmentController } from '../interfaces/http/controllers/appointment.controller';
// ... otros controladores ...

// A. Repositorios (Inyección de la conexión DB)
const patientRepository = new PatientRepository(pgClient);
// ...

// B. Casos de Uso (Inyección del Repositorio)
// Creamos una instancia de CADA CASO DE USO para la inyección:
export const createPatientUseCase = new CreatePatientUseCase(patientRepository);
export const getPatientByIdUseCase = new GetPatientByIdUseCase(patientRepository);
export const listPatientUseCase = new ListPatientUseCase(patientRepository);
// ... y todos los demás...

// C. Controladores (Inyección de Casos de Uso)
// Creamos la instancia del Controlador, inyectando todos los directores necesarios.
// NOTA: Solo inyectamos los Use Cases necesarios para ese Controlador (CRUD Paciente).
export const patientController = new PatientController(
  createPatientUseCase,
  getPatientByIdUseCase,
  listPatientUseCase
  // Aquí se inyectarían los demás Casos de Uso de Update/Delete
);

// Aquí irían otros controladores (ej: authController)