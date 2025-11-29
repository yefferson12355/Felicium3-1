import React from 'react';

const MetricasRecepcionista = () => {
  // Datos de ejemplo para las métricas
  const metricas = [
    { titulo: 'Citas Hoy', valor: '12', subtitulo: '8 confirmadas • 4 pendientes' },
    { titulo: 'Pacientes Nuevos', valor: '3', subtitulo: 'Este mes' },
    { titulo: 'Próxima Cita', valor: '10:30 - Juan Pérez', subtitulo: 'En 30 minutos' },
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
        Métricas
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {metricas.map((metrica, index) => (
          <div key={index} style={{
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '14px',
                color: '#6B778C',
                marginBottom: '4px'
              }}>
                {metrica.titulo}
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                {metrica.valor}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6B778C',
                marginTop: '4px'
              }}>
                {metrica.subtitulo}
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#DEEBFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                fontSize: '18px',
                color: '#0052CC'
              }}>
                {index === 0 ? '📅' : index === 1 ? '👤' : '⏰'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricasRecepcionista;