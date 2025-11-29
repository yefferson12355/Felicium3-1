import PanelPaciente from '../../features/dashboard/components/PanelPaciente';
import CitasPaciente from '../../features/appointments/components/CitasPaciente';
import SolicitarCita from '../../features/appointments/components/SolicitarCita';
import HistorialClinico from '../../features/medical/components/HistorialClinico';
import PagosFacturacion from '../../features/billing/components/PagosFacturacion';

export const patientRoutes = {
  '/paciente': PanelPaciente,
  '/paciente/citas': CitasPaciente,
  '/paciente/solicitar-cita': SolicitarCita,
  '/paciente/historial': HistorialClinico,
  '/paciente/pagos': PagosFacturacion,
  // Rutas con hash también
  '#paciente': PanelPaciente,
  '#paciente/citas': CitasPaciente,
  '#paciente/solicitar-cita': SolicitarCita,
  '#paciente/historial': HistorialClinico,
  '#paciente/pagos': PagosFacturacion,
};