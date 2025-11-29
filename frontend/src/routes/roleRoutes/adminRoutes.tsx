import PanelAdmin from '../../features/dashboard/components/PanelAdmin';
import GestionPacientes from '../../features/patients/components/GestionPacientes';
import GestionCitasRecepcionista from '../../features/appointments/components/GestionCitasRecepcionista';
import PagosFacturacion from '../../features/billing/components/PagosFacturacion';
import Reportes from '../../features/dashboard/components/Reportes';
import GestionStaff from '../../features/dashboard/components/GestionStaff';
import Configuracion from '../../features/dashboard/components/Configuracion';

export const adminRoutes = {
  '/admin': PanelAdmin,
  '/admin/pacientes': GestionPacientes,
  '/admin/citas': GestionCitasRecepcionista,
  '/admin/pagos': PagosFacturacion,
  '/admin/reportes': Reportes,
  '/admin/staff': GestionStaff,
  '/admin/configuracion': Configuracion,
  // Rutas con hash también
  '#admin': PanelAdmin,
  '#admin/pacientes': GestionPacientes,
  '#admin/citas': GestionCitasRecepcionista,
  '#admin/pagos': PagosFacturacion,
  '#admin/reportes': Reportes,
  '#admin/staff': GestionStaff,
  '#admin/configuracion': Configuracion,
};