import PanelDentista from '../../features/dashboard/components/PanelDentista';
import GestionCitasDentista from '../../features/appointments/components/GestionCitasDentista';
import GestionPacientesDentista from '../../features/patients/components/GestionPacientesDentista';
import Odontograma from '../../features/medical/components/Odontograma';
import HistorialClinico from '../../features/medical/components/HistorialClinico';

export const dentistRoutes = {
  '/dentista': PanelDentista,
  '/dentista/citas': GestionCitasDentista,
  '/dentista/pacientes': GestionPacientesDentista,
  '/dentista/odontograma': Odontograma,
  '/dentista/historial': HistorialClinico,
  // Rutas con hash también
  '#dentista': PanelDentista,
  '#dentista/citas': GestionCitasDentista,
  '#dentista/pacientes': GestionPacientesDentista,
  '#dentista/odontograma': Odontograma,
  '#dentista/historial': HistorialClinico,
  // Alias para #doctor (mismo contenido que #dentista)
  '/doctor': PanelDentista,
  '/doctor/citas': GestionCitasDentista,
  '/doctor/pacientes': GestionPacientesDentista,
  '/doctor/odontograma': Odontograma,
  '/doctor/historial': HistorialClinico,
  '#doctor': PanelDentista,
  '#doctor/citas': GestionCitasDentista,
  '#doctor/pacientes': GestionPacientesDentista,
  '#doctor/odontograma': Odontograma,
  '#doctor/historial': HistorialClinico,
};