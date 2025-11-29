import React, { useState } from 'react';

const MensajesRecientes = () => {
  const [mensajes, setMensajes] = useState([
    { id: 1, remitente: 'Dra. López (doctor)', contenido: 'Su próxima cita es el viernes...', fecha: 'Hoy', abierto: false },
    { id: 2, remitente: 'Recepción (administrador)', contenido: 'Recordatorio: Limpieza dental...', fecha: 'Ayer', abierto: false },
    { id: 3, remitente: 'Dr. Pérez (doctor)', contenido: 'Resultados de su tratamiento...', fecha: '2 días ago', abierto: false }
  ]);
  
  const [respuesta, setRespuesta] = useState({});

  const origenMensajes = ["doctor", "administrador", "recepcionista"];
  
  const toggleMensaje = (id) => {
    setMensajes(mensajes.map(m => 
      m.id === id ? { ...m, abierto: !m.abierto } : m
    ));
  };

  const responderMensaje = (id) => {
    // In a real app, this would make an API call
    console.log(`Respondiendo mensaje ${id} con: ${respuesta[id]}`);
    setRespuesta({ ...respuesta, [id]: '' });
  };

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
        Mensajes
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mensajes.map((mensaje) => (
          <div 
            key={mensaje.id}
            style={{
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div
              onClick={() => toggleMensaje(mensaje.id)}
              style={{
                padding: '12px',
                backgroundColor: mensaje.abierto ? '#DEEBFF' : 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 500, color: '#172B4D' }}>
                  {mensaje.remitente}
                </div>
                <div style={{ fontSize: '14px', color: '#6B778C', marginTop: '4px' }}>
                  {mensaje.contenido}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#6B778C', whiteSpace: 'nowrap' }}>
                {mensaje.fecha}
              </div>
            </div>
            
            {mensaje.abierto && (
              <div style={{ padding: '12px', borderTop: '1px solid #DFE1E6' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={respuesta[mensaje.id] || ''}
                    onChange={(e) => setRespuesta({ 
                      ...respuesta, 
                      [mensaje.id]: e.target.value 
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
                    onClick={() => responderMensaje(mensaje.id)}
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
        Ver todos los mensajes
      </button>
    </div>
  );
};

export default MensajesRecientes;