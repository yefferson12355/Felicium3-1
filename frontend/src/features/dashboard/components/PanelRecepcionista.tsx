import React, { useEffect, useState, useCallback } from 'react';
import { dashboardService } from '../../../core/services/api/dashboardService';
import { appointmentService } from '../../../core/services/api/appointmentService';
import { patientService } from '../../../core/services/api/patientService';
import theme from '../../../core/styles/theme';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Card/Badge';
import { Loader } from '../../../components/ui/Loader';

const PanelRecepcionista = ({ view = 'panel' }) => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('appointments');

  // Función para cargar datos (wrapped en useCallback para evitar warning)
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar stats en paralelo
      const statsData = await dashboardService.getOverview();
      const appointmentsResponse = await appointmentService.getAll();
      const patientsResponse = await patientService.getAll();

      console.log('📊 Stats Response:', statsData);
      console.log('📅 Appointments Response:', appointmentsResponse);
      console.log('👥 Patients Response:', patientsResponse);

      // Extraer datos correctamente de las respuestas
      // Backend devuelve array directo para patients: [{id, dni, nombre...}, ...]
      const appointmentsData = appointmentsResponse?.appointments || [];
      const patientsData = Array.isArray(patientsResponse) ? patientsResponse : (patientsResponse?.patients || []);

      console.log('✅ Extracted Stats:', statsData);
      console.log('✅ Extracted Appointments:', appointmentsData);
      console.log('✅ Extracted Patients:', patientsData);

      // Mapear stats del backend a formato esperado
      const mappedStats = {
        totalAppointments: statsData?.appointmentsToday || statsData?.totalAppointmentsMonth || 0,
        newPatients: statsData?.newPatientsMonth || 0,
        todayRevenue: statsData?.totalRevenueMonth || 0,
      };

      setStats(mappedStats);
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
      setPatients(Array.isArray(patientsData) ? patientsData : []);
      setError(null);
    } catch (err) {
      console.error('❌ Error cargando datos:', err);
      setError('Error al cargar datos del dashboard');
      // Datos de fallback
      setStats({ totalAppointments: 12, newPatients: 5, todayRevenue: 1250 });
      setAppointments([]);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback sin dependencias

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, [loadData]); // Ahora loadData es estable

  // Styles using theme
  const containerStyles = {
    padding: theme.spacing[5],
    backgroundColor: theme.colors.background.default,
    minHeight: 'calc(100vh - 60px)',
  };

  const headerStyles = {
    marginBottom: theme.spacing[6],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  };

  const statCardStyles = {
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const statLabelStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
  };

  const statValueStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  };

  const sectionNavStyles = {
    display: 'flex',
    gap: theme.spacing[2],
    marginBottom: theme.spacing[5],
    borderBottom: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  };

  const navBtnStyles = {
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    borderBottom: `${theme.borders.width.medium} solid transparent`,
    color: theme.colors.text.secondary,
    transition: `all ${theme.transitions.duration.fast}`,
  };

  const navBtnActiveStyles = {
    color: theme.colors.primary[600],
    borderBottom: `${theme.borders.width.medium} solid ${theme.colors.primary[600]}`,
  };

  const cardHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[5],
    flexWrap: 'wrap',
    gap: theme.spacing[3],
  };

  const cardTitleStyles = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: `${theme.spacing[10]} ${theme.spacing[5]}`,
  };

  const footerStyles = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing[5],
    textAlign: 'center',
  };

  const errorBoxStyles = {
    backgroundColor: theme.colors.error[50],
    border: `${theme.borders.width.thin} solid ${theme.colors.error[500]}`,
    color: theme.colors.error[700],
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderRadius: theme.borders.radius.base,
    marginBottom: theme.spacing[5],
    fontSize: theme.typography.fontSize.sm,
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <Loader size="lg" text="Cargando datos del dashboard..." />
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {/* HEADER */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>📋 Panel de Recepcionista</h1>
        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          <Button 
            variant="success"
            onClick={loadData}
            disabled={loading}
          >
            🔄 Actualizar
          </Button>
          <Badge variant="primary">✓ En servicio</Badge>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && <div style={errorBoxStyles}>⚠️ {error}</div>}

      {/* STATS CARDS */}
      <div style={statsGridStyles}>
        <Card 
          hoverable 
          onClick={() => setActiveSection('appointments')}
          style={statCardStyles}
        >
          <p style={statLabelStyles}>📅 Citas Hoy</p>
          <p style={statValueStyles}>{stats?.totalAppointments || 0}</p>
        </Card>
        <Card 
          hoverable 
          onClick={() => setActiveSection('patients')}
          style={statCardStyles}
        >
          <p style={statLabelStyles}>👥 Pacientes</p>
          <p style={statValueStyles}>{stats?.newPatients || 0}</p>
        </Card>
        <Card hoverable style={statCardStyles}>
          <p style={statLabelStyles}>💰 Ingresos Hoy</p>
          <p style={statValueStyles}>S/. {stats?.todayRevenue || 0}</p>
        </Card>
      </div>

      {/* NAVIGATION TABS */}
      <div style={sectionNavStyles}>
        <button 
          style={{
            ...navBtnStyles,
            ...(activeSection === 'appointments' ? navBtnActiveStyles : {})
          }}
          onClick={() => setActiveSection('appointments')}
        >
          📅 Citas ({appointments.length})
        </button>
        <button 
          style={{
            ...navBtnStyles,
            ...(activeSection === 'patients' ? navBtnActiveStyles : {})
          }}
          onClick={() => setActiveSection('patients')}
        >
          👥 Pacientes ({patients.length})
        </button>
      </div>

      {/* SECTION 1: APPOINTMENTS */}
      {activeSection === 'appointments' && (
        <Card>
          <div style={cardHeaderStyles}>
            <h2 style={cardTitleStyles}>📅 Citas Programadas</h2>
            <Button 
              variant="primary"
              onClick={() => window.location.hash = '#recepcionista/citas'}
            >
              + Nueva Cita
            </Button>
          </div>

          {appointments.length > 0 ? (
            <Table
              columns={[
                { header: 'Hora', accessor: 'time', render: (row) => row.time || row.hora || '--:--' },
                { header: 'Paciente', accessor: 'patientName', render: (row) => row.patientName || row.patient_name || 'N/A' },
                { header: 'Dentista', accessor: 'dentistName', render: (row) => row.dentistName || row.dentist_name || 'N/A' },
                { header: 'Tipo', accessor: 'type', render: (row) => row.type || row.tipo || 'Consulta' },
                { 
                  header: 'Estado', 
                  accessor: 'status',
                  render: (row) => (
                    <Badge 
                      variant={row.status === 'confirmed' || row.status === 'confirmada' ? 'success' : 'warning'}
                    >
                      {row.status || 'Pendiente'}
                    </Badge>
                  )
                },
                { 
                  header: 'Acciones', 
                  accessor: 'actions',
                  render: () => (
                    <Button 
                      size="sm"
                      variant="secondary"
                      onClick={() => window.location.hash = '#recepcionista/citas'}
                    >
                      ✏️ Editar
                    </Button>
                  )
                },
              ]}
              data={appointments.slice(0, 10)}
              striped
              hoverable
            />
          ) : (
            <div style={emptyStateStyles}>
              <p style={{ fontSize: theme.typography.fontSize.lg, margin: `0 0 ${theme.spacing[3]} 0` }}>
                📭 No hay citas registradas hoy
              </p>
              <Button 
                variant="primary"
                onClick={() => window.location.hash = '#recepcionista/citas'}
              >
                + Agendar Primera Cita
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* SECTION 2: PATIENTS */}
      {activeSection === 'patients' && (
        <Card>
          <div style={cardHeaderStyles}>
            <h2 style={cardTitleStyles}>👥 Pacientes Activos</h2>
            <Button 
              variant="primary"
              onClick={() => window.location.hash = '#recepcionista/pacientes'}
            >
              + Nuevo Paciente
            </Button>
          </div>

          {patients.length > 0 ? (
            <Table
              columns={[
                { 
                  header: 'Nombre', 
                  accessor: 'name',
                  render: (row) => row.firstName && row.lastName 
                    ? `${row.firstName} ${row.lastName}` 
                    : row.name || row.nombre || 'N/A'
                },
                { header: 'Email', accessor: 'email', render: (row) => row.email || 'N/A' },
                { header: 'Teléfono', accessor: 'phone', render: (row) => row.phone || row.telefono || 'N/A' },
                { header: 'Última Cita', accessor: 'lastVisit', render: (row) => row.lastVisit || row.last_appointment || '--' },
                { 
                  header: 'Acciones', 
                  accessor: 'actions',
                  render: () => (
                    <Button 
                      size="sm"
                      variant="secondary"
                      onClick={() => window.location.hash = '#recepcionista/pacientes'}
                    >
                      👁️ Ver
                    </Button>
                  )
                },
              ]}
              data={patients.slice(0, 10)}
              striped
              hoverable
            />
          ) : (
            <div style={emptyStateStyles}>
              <p style={{ fontSize: theme.typography.fontSize.lg, margin: `0 0 ${theme.spacing[3]} 0` }}>
                👤 No hay pacientes registrados
              </p>
              <Button 
                variant="primary"
                onClick={() => window.location.hash = '#recepcionista/pacientes'}
              >
                + Registrar Primer Paciente
              </Button>
            </div>
          )}
        </Card>
      )}

      {/* FOOTER */}
      <div style={footerStyles}>
        ⏱️ Última actualización: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PanelRecepcionista;
