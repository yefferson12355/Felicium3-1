import PanelRecepcionista from '../../features/dashboard/components/PanelRecepcionista';
import GestionCitasRecepcionista from '../../features/appointments/components/GestionCitasRecepcionista';
import GestionPacientes from '../../features/patients/components/GestionPacientes';
import PagosFacturacion from '../../features/billing/components/PagosFacturacion';
import MetricasRecepcionista from '../../features/dashboard/components/MetricasRecepcionista';

export const receptionistRoutes = {
  '/recepcionista': PanelRecepcionista,
  '/recepcionista/citas': GestionCitasRecepcionista,
  '/recepcionista/pacientes': GestionPacientes,
  '/recepcionista/pagos': PagosFacturacion,
  '/recepcionista/metricas': MetricasRecepcionista,
  // Rutas con hash también
  '#recepcionista': PanelRecepcionista,
  '#recepcionista/citas': GestionCitasRecepcionista,
  '#recepcionista/pacientes': GestionPacientes,
  '#recepcionista/pagos': PagosFacturacion,
  '#recepcionista/metricas': MetricasRecepcionista,
};