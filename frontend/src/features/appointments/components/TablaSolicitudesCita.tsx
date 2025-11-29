import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../../core/services/api/appointmentService';

/**
 * TablaSolicitudesCita - Muestra tabla de solicitudes de citas
 */
const TablaSolicitudesCita = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar citas del API
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getAll();
      const appts = response?.data?.appointments || response?.data?.data || [];
      setAppointments(Array.isArray(appts) ? appts : []);
      setError(null);
    } catch (err) {
      console.error('❌ Error cargando citas:', err);
      setError('Error al cargar citas');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleConfirm = async (aptId) => {
    try {
      await appointmentService.confirmAppointment(aptId);
      await loadAppointments(); // Recargar lista
    } catch (err) {
      console.error('Error confirmando cita:', err);
      setError('Error al confirmar cita');
    }
  };

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #dfe1e6'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#f5f7fa',
      fontSize: '13px',
      fontWeight: '600',
      color: '#626f86',
      borderBottom: '2px solid #dfe1e6'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #dfe1e6',
      fontSize: '14px',
      color: '#172b4d'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '3px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusPending: {
      backgroundColor: '#fff0b3',
      color: '#974f0c'
    },
    statusConfirmed: {
      backgroundColor: '#dffcf0',
      color: '#216e4e'
    },
    loadingText: {
      textAlign: 'center',
      padding: '40px',
      color: '#626f86'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#626f86'
    }
  };

  if (loading) {
    return <div style={styles.loadingText}>⏳ Cargando solicitudes...</div>;
  }

  if (appointments.length === 0) {
    return <div style={styles.emptyState}>📭 No hay solicitudes de cita</div>;
  }

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: '#172b4d' }}>📋 Solicitudes de Cita</h3>
        <button 
          style={{
            padding: '8px 12px',
            backgroundColor: '#00875A',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          onClick={loadAppointments}
          disabled={loading}
        >
          🔄 Actualizar
        </button>
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Paciente</th>
            <th style={styles.th}>Fecha y Hora</th>
            <th style={styles.th}>Dentista</th>
            <th style={styles.th}>Razón</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, idx) => (
            <tr key={idx}>
              <td style={styles.td}>{apt.paciente || apt.patient_name || 'N/A'}</td>
              <td style={styles.td}>
                {apt.fecha_hora 
                  ? new Date(apt.fecha_hora).toLocaleString('es-ES', { 
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })
                  : 'N/A'
                }
              </td>
              <td style={styles.td}>{apt.dentista || apt.dentist_name || 'N/A'}</td>
              <td style={styles.td}>{apt.razon_consulta || apt.reason || '-'}</td>
              <td style={styles.td}>
                <span style={{
                  ...styles.statusBadge,
                  ...(apt.status === 'confirmada' || apt.status === 'confirmed'
                    ? styles.statusConfirmed
                    : styles.statusPending)
                }}>
                  {apt.status === 'confirmada' || apt.status === 'confirmed' ? '✓ Confirmada' : '⏳ Pendiente'}
                </span>
              </td>
              <td style={styles.td}>
                <button 
                  style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    backgroundColor: apt.status === 'confirmada' || apt.status === 'confirmed' ? '#626f86' : '#0052cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: apt.status === 'confirmada' || apt.status === 'confirmed' ? 'not-allowed' : 'pointer',
                    opacity: apt.status === 'confirmada' || apt.status === 'confirmed' ? 0.6 : 1
                  }}
                  onClick={() => handleConfirm(apt.id)}
                  disabled={apt.status === 'confirmada' || apt.status === 'confirmed'}
                >
                  {apt.status === 'confirmada' || apt.status === 'confirmed' ? '✓ Confirmada' : '✓ Confirmar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <div style={{ color: '#ae2a19', backgroundColor: '#ffeceb', padding: '12px', borderRadius: '4px', marginTop: '12px' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default TablaSolicitudesCita;
