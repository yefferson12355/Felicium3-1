import React from 'react';

const PróximasCitas = () => {
  // Mock data for upcoming appointments
  const citas = [
    { id: 1, fecha: '15 Nov 2025', hora: '10:00', dentista: 'Dra. López', tipo: 'Limpieza', estado: 'confirmada' },
    { id: 2, fecha: '18 Nov 2025', hora: '14:30', dentista: 'Dr. Pérez', tipo: 'Endodoncia', estado: 'confirmada' },
    { id: 3, fecha: '22 Nov 2025', hora: '09:00', dentista: 'Dra. Gómez', tipo: 'Revisión', estado: 'pendiente' }
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
      padding: '20px'
    }}>
      <h2 style={{
        margin: '0 0 16px 0',
        fontSize: '18px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Próximas Citas
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {citas.map((cita) => (
          <div 
            key={cita.id}
            style={{
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              padding: '12px',
              backgroundColor: cita.estado === 'confirmada' ? '#E6FCBF' : '#FFFAE6'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 500, color: '#172B4D' }}>
                  {cita.fecha} a las {cita.hora}
                </div>
                <div style={{ fontSize: '14px', color: '#6B778C' }}>
                  {cita.dentista} - {cita.tipo}
                </div>
              </div>
              <span style={{
                padding: '4px 8px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: cita.estado === 'confirmada' ? '#36B37E' : '#FF991F',
                color: 'white'
              }}>
                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button style={{
        marginTop: '16px',
        width: '100%',
        padding: '8px',
        backgroundColor: 'transparent',
        border: '1px solid #0052CC',
        borderRadius: '3px',
        color: '#0052CC',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        Ver todas las citas
      </button>
    </div>
  );
};

export default PróximasCitas;