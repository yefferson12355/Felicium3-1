import React, { useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../../../core/services/api/appointmentService';
import { patientService } from '../../../core/services/api/patientService';
import theme from '../../../core/styles/theme';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Card/Badge';
import { Loader } from '../../../components/ui/Loader';
import { Table } from '../../../components/ui/Table';

const PanelPaciente = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalConsults: 0, pendingTreatments: 0, unreadMessages: 0 });
  const [nextAppointment, setNextAppointment] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentTreatments, setRecentTreatments] = useState([]);

  // Cargar datos reales
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const appointmentsResponse = await appointmentService.getAll();
      const appointmentsData = appointmentsResponse?.appointments || [];
      
      // Procesar datos
      setUpcomingAppointments(appointmentsData.slice(0, 5));
      if (appointmentsData.length > 0) {
        setNextAppointment({ 
          date: appointmentsData[0].time || appointmentsData[0].hora, 
          doctor: appointmentsData[0].dentistName || appointmentsData[0].doctor 
        });
      }
      
      setStats({
        totalConsults: appointmentsData.filter(a => a.status === 'completed').length,
        pendingTreatments: appointmentsData.filter(a => a.status === 'pending').length,
        unreadMessages: 2, // Mock - reemplazar con API real
      });
    } catch (error) {
      console.error('Error loading patient data:', error);
      // Fallback a datos mock
      setStats({ totalConsults: 12, pendingTreatments: 3, unreadMessages: 2 });
      setNextAppointment({ date: '15 Nov, 10:30 AM', doctor: 'Dr. López' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Mock data para mensajes y tratamientos (reemplazar con API)
  const recentMessagesData = [
    { id: 1, from: 'Dr. López', preview: 'Recordatorio de cita...', time: 'Hace 2 días' },
    { id: 2, from: 'Recepción', preview: 'Confirmación de tratam...', time: 'Hace 5 días' },
  ];

  const recentTreatmentsData = [
    { id: 1, date: '05 Nov 2025', treatment: 'Limpieza Profunda', dentist: 'Dr. López', status: 'completed' },
    { id: 2, date: '15 Oct 2025', treatment: 'Empaste', dentist: 'Dra. Rojas', status: 'scheduled' },
  ];

  // Styles
  const containerStyles = {
    padding: theme.spacing[5],
    backgroundColor: theme.colors.background.default,
    minHeight: 'calc(100vh - 60px)',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[6],
  };

  const statLabelStyles = {
    margin: `0 0 ${theme.spacing[2]} 0`,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  };

  const statValueStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  };

  const statSecondaryStyles = {
    margin: `${theme.spacing[1]} 0 0 0`,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
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

  const listStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  };

  const listItemStyles = {
    border: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    borderRadius: theme.borders.radius.base,
    padding: theme.spacing[4],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const itemMainTextStyles = {
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  };

  const itemSecondaryTextStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <Loader size="lg" text="Cargando datos del paciente..." />
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {/* HEADER */}
      <div style={headerStyles}>
        <h1 style={titleStyles}>Panel del Paciente</h1>
        <Badge variant="primary">Paciente</Badge>
      </div>

      {/* STATS CARDS */}
      <div style={statsGridStyles}>
        <Card>
          <h3 style={statLabelStyles}>Próxima Cita</h3>
          <p style={statValueStyles}>{nextAppointment?.date || 'Sin citas programadas'}</p>
          <p style={statSecondaryStyles}>{nextAppointment?.doctor || '-'}</p>
        </Card>
        <Card>
          <h3 style={statLabelStyles}>Consultas Realizadas</h3>
          <p style={statValueStyles}>{stats.totalConsults}</p>
        </Card>
        <Card>
          <h3 style={statLabelStyles}>Tratamientos Pendientes</h3>
          <p style={statValueStyles}>{stats.pendingTreatments}</p>
        </Card>
        <Card>
          <h3 style={statLabelStyles}>Mensajes Sin Leer</h3>
          <p style={statValueStyles}>{stats.unreadMessages}</p>
        </Card>
      </div>

      {/* TWO COLUMN SECTION */}
      <div style={twoColumnGridStyles}>
        {/* Upcoming Appointments */}
        <Card>
          <h2 style={sectionTitleStyles}>Próximas Citas</h2>
          <div style={listStyles}>
            {upcomingAppointments.length > 0 ? upcomingAppointments.map(apt => (
              <div key={apt.id} style={listItemStyles}>
                <div>
                  <div style={itemMainTextStyles}>{apt.date}</div>
                  <div style={itemSecondaryTextStyles}>{apt.type} - {apt.doctor}</div>
                </div>
                <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'}>
                  {apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </Badge>
              </div>
            )) : (
              <p style={{ color: theme.colors.text.secondary, textAlign: 'center', padding: theme.spacing[5] }}>
                No hay citas programadas
              </p>
            )}
          </div>
        </Card>

        {/* Recent Messages */}
        <Card>
          <h2 style={sectionTitleStyles}>Mensajes Recientes</h2>
          <div style={listStyles}>
            {recentMessagesData.map(msg => (
              <div key={msg.id} style={listItemStyles}>
                <div>
                  <div style={itemMainTextStyles}>{msg.from}</div>
                  <div style={itemSecondaryTextStyles}>{msg.preview}</div>
                </div>
                <div style={{ 
                  fontSize: theme.typography.fontSize.xs, 
                  color: theme.colors.text.tertiary 
                }}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RECENT TREATMENTS TABLE */}
      <Card>
        <h2 style={sectionTitleStyles}>Tratamientos Recientes</h2>
        <Table
          columns={[
            { header: 'Fecha', accessor: 'date' },
            { header: 'Tratamiento', accessor: 'treatment' },
            { header: 'Dentista', accessor: 'dentist' },
            { 
              header: 'Estado', 
              accessor: 'status',
              render: (row) => (
                <Badge variant={row.status === 'completed' ? 'success' : 'warning'}>
                  {row.status === 'completed' ? 'Completado' : 'Programado'}
                </Badge>
              )
            },
          ]}
          data={recentTreatmentsData}
          striped
        />
      </Card>
    </div>
  );
};

export default PanelPaciente;