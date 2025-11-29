import React, { useState } from 'react';
import CalendarioSemanal from './CalendarioSemanal';
import TablaSolicitudesCita from './TablaSolicitudesCita';
import FormularioAgendarCita from './FormularioAgendarCita';

const GestionCitasRecepcionista = () => {
  const [activeTab, setActiveTab] = useState('calendario'); // 'calendario' or 'solicitudes'
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateTimeSelect = (dateTimeData) => {
    setSelectedDate(dateTimeData.date);
    setSelectedHour(dateTimeData.time);
    setMostrarModal(true);
  };

  const handleConfirmCita = (cita) => {
    console.log('Cita confirmada:', cita);
    // Recargar la página de tabla de citas para ver la nueva cita
    if (activeTab === 'calendario') {
      setActiveTab('solicitudes');
      setTimeout(() => setActiveTab('calendario'), 100);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => window.location.hash = '#recepcionista'}
            style={{
              padding: '8px 12px',
              backgroundColor: '#626F86',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Volver al Panel
          </button>
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            color: '#172B4D'
          }}>
            Gestión de Citas
          </h2>
        </div>
        <button
          onClick={() => setMostrarModal(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0052CC',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          + Agendar Nueva Cita
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid #DFE1E6'
      }}>
        <button
          onClick={() => setActiveTab('calendario')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'calendario' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'calendario' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'calendario' ? '500' : '400',
            color: activeTab === 'calendario' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Calendario
        </button>
        <button
          onClick={() => setActiveTab('solicitudes')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'solicitudes' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'solicitudes' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'solicitudes' ? '500' : '400',
            color: activeTab === 'solicitudes' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Solicitudes de Cita
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'calendario' && (
        <div>
          <CalendarioSemanal
            onDateTimeSelect={handleDateTimeSelect}
            selectedDateTime={{ date: selectedDate, time: selectedHour }}
            role="recepcionista"
            citasExistentes={[
              // Datos de ejemplo para todas las citas de todos los doctores
              // Dr. López
              { fecha: '2025-11-13', hora: '09:00', paciente: 'Juan Pérez', dentista: 'Dr. López' },
              { fecha: '2025-11-13', hora: '10:30', paciente: 'María González', dentista: 'Dr. López' },
              { fecha: '2025-11-13', hora: '14:00', paciente: 'Luis Hernández', dentista: 'Dr. López' },
              { fecha: '2025-11-14', hora: '11:00', paciente: 'Sofia López', dentista: 'Dr. López' },
              { fecha: '2025-11-15', hora: '09:30', paciente: 'Roberto Díaz', dentista: 'Dr. López' },
              { fecha: '2025-11-16', hora: '10:00', paciente: 'Ana Martínez', dentista: 'Dr. López' },

              // Dra. Rojas
              { fecha: '2025-11-13', hora: '11:15', paciente: 'Carlos Rodríguez', dentista: 'Dra. Rojas' },
              { fecha: '2025-11-13', hora: '15:00', paciente: 'Fernanda Gómez', dentista: 'Dra. Rojas' },
              { fecha: '2025-11-14', hora: '09:30', paciente: 'Pedro Sánchez', dentista: 'Dra. Rojas' },
              { fecha: '2025-11-14', hora: '15:30', paciente: 'Luis Fernández', dentista: 'Dra. Rojas' },
              { fecha: '2025-11-15', hora: '13:00', paciente: 'Claudia Silva', dentista: 'Dra. Rojas' },

              // Dr. Pérez
              { fecha: '2025-11-13', hora: '08:30', paciente: 'Jorge Ruiz', dentista: 'Dr. Pérez' },
              { fecha: '2025-11-13', hora: '16:00', paciente: 'Elena Vásquez', dentista: 'Dr. Pérez' },
              { fecha: '2025-11-14', hora: '14:00', paciente: 'Ana Martínez', dentista: 'Dr. Pérez' },
              { fecha: '2025-11-15', hora: '10:30', paciente: 'Miguel Torres', dentista: 'Dr. Pérez' },
              { fecha: '2025-11-16', hora: '14:30', paciente: 'Lucía Morales', dentista: 'Dr. Pérez' },

              // Dra. Gómez
              { fecha: '2025-11-13', hora: '13:30', paciente: 'Ricardo Jiménez', dentista: 'Dra. Gómez' },
              { fecha: '2025-11-14', hora: '11:30', paciente: 'Patricia Córdoba', dentista: 'Dra. Gómez' },
              { fecha: '2025-11-15', hora: '11:00', paciente: 'Roberto Díaz', dentista: 'Dra. Gómez' },
              { fecha: '2025-11-16', hora: '09:15', paciente: 'Verónica Lugo', dentista: 'Dra. Gómez' },
              { fecha: '2025-11-16', hora: '15:45', paciente: 'Andrés Ríos', dentista: 'Dra. Gómez' },

              // Dr. Gómez (otros horarios)
              { fecha: '2025-11-14', hora: '16:30', paciente: 'Sandra Herrera', dentista: 'Dr. Gómez' },
              { fecha: '2025-11-15', hora: '15:00', paciente: 'Tomás Salinas', dentista: 'Dr. Gómez' },
            ]}
          />
        </div>
      )}

      {activeTab === 'solicitudes' && (
        <div>
          <TablaSolicitudesCita />
        </div>
      )}

      {mostrarModal && (
        <FormularioAgendarCita
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          onSubmit={handleConfirmCita}
        />
      )}
    </div>
  );
};

export default GestionCitasRecepcionista;