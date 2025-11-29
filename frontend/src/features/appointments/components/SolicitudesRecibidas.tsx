import React, { useState } from 'react';

const SolicitudesRecibidas = () => {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      tipo: 'Recordatorio de cita',
      autor: 'Dr. López',
      fecha: '10 Nov 2025',
      mensaje: 'Le recordamos su cita programada para el viernes 15 a las 10:30 AM para una limpieza dental.',
      abierto: true
    },
    {
      id: 2,
      tipo: 'Solicitud de reprogramación',
      autor: 'Dra. Rojas',
      fecha: '12 Nov 2025',
      mensaje: 'Necesitamos reprogramar su cita del martes 19 por motivos de emergencia. ¿Está disponible el miércoles en la tarde?',
      abierto: false
    }
  ]);
  
  const [mensajeRespuesta, setMensajeRespuesta] = useState({});

  const toggleSolicitud = (id) => {
    setSolicitudes(solicitudes.map(s => 
      s.id === id ? { ...s, abierto: !s.abierto } : s
    ));
  };

  const aceptarSolicitud = (id) => {
    // In a real app, this would make an API call
    console.log(`Solicitud ${id} aceptada`);
    // Remove the solicitud after accepting
    setSolicitudes(solicitudes.filter(s => s.id !== id));
  };

  const denegarSolicitud = (id) => {
    // In a real app, this would make an API call
    console.log(`Solicitud ${id} denegada`);
    // Remove the solicitud after denying
    setSolicitudes(solicitudes.filter(s => s.id !== id));
  };

  const responderSolicitud = (id) => {
    // In a real app, this would make an API call
    console.log(`Respondiendo solicitud ${id} con: ${mensajeRespuesta[id]}`);
    setMensajeRespuesta({ ...mensajeRespuesta, [id]: '' });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
      padding: '20px',
      marginBottom: '20px'
    }}>
      <h2 style={{
        margin: '0 0 16px 0',
        fontSize: '18px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Comunicados del Staff Médico
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {solicitudes.map((solicitud) => (
          <div key={solicitud.id} style={{
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div
              onClick={() => toggleSolicitud(solicitud.id)}
              style={{
                padding: '12px',
                backgroundColor: solicitud.abierto ? '#DEEBFF' : 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 500, color: '#172B4D' }}>
                  {solicitud.tipo} - De: {solicitud.autor}
                </div>
                <div style={{ fontSize: '14px', color: '#6B778C' }}>
                  {solicitud.fecha}
                </div>
              </div>
              <div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: solicitud.abierto ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path d="M8.00001 10.6667L2.66668 5.33334L4.00001 4L8.00001 8L12 4L13.3333 5.33334L8.00001 10.6667Z" fill="#6B778C"/>
                </svg>
              </div>
            </div>

            {solicitud.abierto && (
              <div style={{ padding: '12px', borderTop: '1px solid #DFE1E6' }}>
                <div style={{ marginBottom: '12px', color: '#172B4D' }}>
                  {solicitud.mensaje}
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <button
                    onClick={() => aceptarSolicitud(solicitud.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#36B37E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.8652 3.464L5.48663 9.8425L2.13477 6.49063L2.86523 5.76017L5.48663 8.38157L11.1348 2.7334L11.8652 3.464Z" fill="white"/>
                    </svg>
                    <span style={{ marginLeft: '4px' }}>Aceptar</span>
                  </button>

                  <button
                    onClick={() => denegarSolicitud(solicitud.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#FF5630',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.00002 7.00002L11.26 3.74002L10.26 2.74002L7.00002 6.00002L3.74002 2.74002L2.74002 3.74002L6.00002 7.00002L2.74002 10.26L3.74002 11.26L7.00002 8.00002L10.26 11.26L11.26 10.26L8.00002 7.00002Z" fill="white"/>
                    </svg>
                    <span style={{ marginLeft: '4px' }}>Denegar</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={mensajeRespuesta[solicitud.id] || ''}
                    onChange={(e) => setMensajeRespuesta({
                      ...mensajeRespuesta,
                      [solicitud.id]: e.target.value
                    })}
                    placeholder="Escribe tu respuesta..."
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid #DFE1E6',
                      borderRadius: '3px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={() => responderSolicitud(solicitud.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#0052CC',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Responder
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudesRecibidas;