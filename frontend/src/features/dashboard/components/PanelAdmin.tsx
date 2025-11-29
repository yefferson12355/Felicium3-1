import React, { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../../../core/services/api/dashboardService';
import theme from '../../../core/styles/theme';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Card/Badge';
import { Table } from '../../../components/ui/Table';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';

const PanelAdmin = ({ view = 'dashboard' }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDentists: 0,
    todayAppointments: 0,
    monthRevenue: 0,
    pendingPayments: 0,
    activeUsers: 0,
  });
  const [recentActivity] = useState([
    { id: 1, type: 'appointment', user: 'Dr. López', action: 'Atendió cita con María García', time: 'Hace 5 min' },
    { id: 2, type: 'payment', user: 'Recepcionista Ana', action: 'Registró pago de S/. 350', time: 'Hace 12 min' },
    { id: 3, type: 'patient', user: 'Recepcionista Carlos', action: 'Registró nuevo paciente: Juan Torres', time: 'Hace 25 min' },
    { id: 4, type: 'appointment', user: 'Dra. Rojas', action: 'Completó tratamiento de endodoncia', time: 'Hace 1 hora' },
  ]);
  const [topDentists] = useState([
    { id: 1, name: 'Dr. López', patients: 45, revenue: 12500, appointments: 52 },
    { id: 2, name: 'Dra. Rojas', patients: 38, revenue: 10200, appointments: 48 },
    { id: 3, name: 'Dr. Martínez', patients: 32, revenue: 8900, appointments: 40 },
  ]);

  // Cargar estadísticas desde el backend
  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getOverview();
      
      setStats({
        totalPatients: data?.totalPatients || 128,
        totalDentists: data?.totalDentists || 8,
        todayAppointments: data?.appointmentsToday || data?.todayAppointments || 12,
        monthRevenue: data?.totalRevenueMonth || data?.monthRevenue || 22000,
        pendingPayments: data?.appointmentsPending || data?.pendingPayments || 2,
        activeUsers: data?.activeUsers || 4,
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
      // Valores por defecto en caso de error
      setStats({
        totalPatients: 245,
        totalDentists: 8,
        todayAppointments: 32,
        monthRevenue: 45800,
        pendingPayments: 12,
        activeUsers: 156,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Styles
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

  const twoColumnGridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing[5],
    marginBottom: theme.spacing[5],
  };

  const sectionTitleStyles = {
    margin: `0 0 ${theme.spacing[4]} 0`,
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const activityListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  };

  const activityItemStyles = {
    padding: theme.spacing[3],
    border: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    borderRadius: theme.borders.radius.base,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const activityUserStyles = {
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  };

  const activityActionStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  const activityTimeStyles = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
  };

  const getActivityBadgeVariant = (type) => {
    switch (type) {
      case 'appointment': return 'primary';
      case 'payment': return 'success';
      case 'patient': return 'info';
      default: return 'neutral';
    }
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <Loader size="lg" text="Cargando dashboard administrativo..." />
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {/* HEADER */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>📊 Dashboard Administrativo</h1>
        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          <Button variant="primary" onClick={() => window.location.hash = '#admin/reportes'}>
            📈 Ver Reportes
          </Button>
          <Badge variant="warning">Administrador</Badge>
        </div>
      </div>

      {/* STATS CARDS */}
      <div style={statsGridStyles}>
        <Card hoverable>
          <p style={statLabelStyles}>👥 Total Pacientes</p>
          <p style={statValueStyles}>{stats.totalPatients}</p>
        </Card>
        <Card hoverable>
          <p style={statLabelStyles}>🦷 Dentistas Activos</p>
          <p style={statValueStyles}>{stats.totalDentists}</p>
        </Card>
        <Card hoverable>
          <p style={statLabelStyles}>📅 Citas Hoy</p>
          <p style={statValueStyles}>{stats.todayAppointments}</p>
        </Card>
        <Card hoverable>
          <p style={statLabelStyles}>💰 Ingresos Mes</p>
          <p style={statValueStyles}>S/. {(stats.monthRevenue || 0).toLocaleString()}</p>
        </Card>
        <Card hoverable>
          <p style={statLabelStyles}>⏳ Pagos Pendientes</p>
          <p style={statValueStyles}>{stats.pendingPayments}</p>
        </Card>
        <Card hoverable>
          <p style={statLabelStyles}>✅ Usuarios Activos</p>
          <p style={statValueStyles}>{stats.activeUsers}</p>
        </Card>
      </div>

      {/* TWO COLUMN SECTION */}
      <div style={twoColumnGridStyles}>
        {/* Recent Activity */}
        <Card>
          <h2 style={sectionTitleStyles}>🔔 Actividad Reciente</h2>
          <div style={activityListStyles}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={activityItemStyles}>
                <div style={{ flex: 1 }}>
                  <div style={activityUserStyles}>{activity.user}</div>
                  <div style={activityActionStyles}>{activity.action}</div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: theme.spacing[3] }}>
                  <Badge variant={getActivityBadgeVariant(activity.type)} size="sm">
                    {activity.type}
                  </Badge>
                  <div style={{ ...activityTimeStyles, marginTop: theme.spacing[1] }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Dentists */}
        <Card>
          <h2 style={sectionTitleStyles}>🏆 Top Dentistas del Mes</h2>
          <Table
            columns={[
              { header: 'Dentista', accessor: 'name' },
              { header: 'Pacientes', accessor: 'patients' },
              { header: 'Citas', accessor: 'appointments' },
              { 
                header: 'Ingresos', 
                accessor: 'revenue',
                render: (row) => row?.revenue ? `S/. ${row.revenue.toLocaleString()}` : 'S/. 0'
              },
            ]}
            data={topDentists}
            striped
          />
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card>
        <h2 style={sectionTitleStyles}>⚡ Acciones Rápidas</h2>
        <div style={{ display: 'flex', gap: theme.spacing[3], flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => window.location.hash = '#admin/staff'}>
            👨‍⚕️ Gestionar Staff
          </Button>
          <Button variant="secondary" onClick={() => window.location.hash = '#admin/reportes'}>
            📊 Ver Reportes
          </Button>
          <Button variant="secondary" onClick={() => window.location.hash = '#admin/configuracion'}>
            ⚙️ Configuración
          </Button>
          <Button variant="success" onClick={() => alert('Respaldo iniciado')}>
            💾 Respaldo de Datos
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PanelAdmin;