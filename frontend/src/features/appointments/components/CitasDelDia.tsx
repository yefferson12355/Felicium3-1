import React, { useState } from 'react';

const CitasDelDia = () => {
  const [citas, setCitas] = useState([
    { 
      id: 1, 
      paciente: 'Juan Pérez', 
      dentista: 'Dr. López', 
      motivo: 'Limpieza dental', 
      fecha: '12 Nov 2025', 
      hora: '09:00', 
      estado: 'pendiente',
      tipo: 'Limpieza'
    },
    { 
      id: 2, 
      paciente: 'María González', 
      dentista: 'Dra. Rojas', 
      motivo: 'Revisión general', 
      fecha: '12 Nov 2025', 
      hora: '10:30', 
      estado: 'confirmada',
      tipo: 'Revisión'
    },
    { 
      id: 3, 
      paciente: 'Carlos Rodríguez', 
      dentista: 'Dr. Gómez', 
      motivo: 'Endodoncia', 
      fecha: '12 Nov 2025', 
      hora: '11:15', 
      estado: 'pendiente',
      tipo: 'Tratamiento'
    },
    { 
      id: 4, 
      paciente: 'Ana Martínez', 
      dentista: 'Dra. Rojas', 
      motivo: 'Extracción', 
      fecha: '12 Nov 2025', 
      hora: '14:00', 
      estado: 'confirmada',
      tipo: 'Procedimiento'
    },
    { 
      id: 5, 
      paciente: 'Luis Fernández', 
      dentista: 'Dr. López', 
      motivo: 'Primera consulta', 
      fecha: '12 Nov 2025', 
      hora: '15:30', 
      estado: 'pendiente',
      tipo: 'Consulta'
    }
  ]);
  
  const [detalleCita, setDetalleCita] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const estados = {
    'pendiente': { color: '#FF991F', texto: 'Pendiente' },
    'confirmada': { color: '#36B37E', texto: 'Confirmada' },
    'completada': { color: '#0066CC', texto: 'Completada' }
  };

  const aprobarCita = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: 'confirmada' } : cita
    ));
  };

  const rechazarCita = (id) => {
    setCitas(citas.filter(cita => cita.id !== id)); // Para efecto inmediato
    // En implementación real, esto podría marcar como rechazada o eliminar
  };

  const proponerCambio = (id) => {
    // En implementación real, esto abriría un modal para reprogramar
    console.log('Proponer nuevo horario para cita:', id);
  };

  const mostrarDetalle = (cita) => {
    setDetalleCita(cita);
  };

  const citasFiltradas = filtroEstado === 'todos' 
    ? citas 
    : citas.filter(cita => cita.estado === filtroEstado);

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setFiltroEstado('todos')}
          style={{
            padding: '6px 12px',
            backgroundColor: filtroEstado === 'todos' ? '#0052CC' : '#F4F5F7',
            color: filtroEstado === 'todos' ? 'white' : '#172B4D',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltroEstado('pendiente')}
          style={{
            padding: '6px 12px',
            backgroundColor: filtroEstado === 'pendiente' ? '#FF991F' : '#F4F5F7',
            color: filtroEstado === 'pendiente' ? 'white' : '#172B4D',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFiltroEstado('confirmada')}
          style={{
            padding: '6px 12px',
            backgroundColor: filtroEstado === 'confirmada' ? '#36B37E' : '#F4F5F7',
            color: filtroEstado === 'confirmada' ? 'white' : '#172B4D',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Confirmadas
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#F4F5F7',
              borderBottom: '2px solid #DFE1E6'
            }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Paciente</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Dentista</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Motivo</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Fecha/Hora</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Estado</th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita) => (
              <tr key={cita.id} style={{
                borderBottom: '1px solid #DFE1E6'
              }}>
                <td style={{ padding: '12px', color: '#172B4D' }}>{cita.paciente}</td>
                <td style={{ padding: '12px', color: '#172B4D' }}>{cita.dentista}</td>
                <td style={{ padding: '12px', color: '#172B4D' }}>{cita.motivo}</td>
                <td style={{ padding: '12px', color: '#172B4D' }}>{cita.fecha} a las {cita.hora}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: estados[cita.estado]?.color + '20',
                    color: estados[cita.estado]?.color
                  }}>
                    {estados[cita.estado]?.texto}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {cita.estado === 'pendiente' && (
                      <>
                        <button
                          onClick={() => aprobarCita(cita.id)}
                          title="Aprobar"
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#36B37E',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => rechazarCita(cita.id)}
                          title="Rechazar"
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#FF5630',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✗
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => proponerCambio(cita.id)}
                      title="Proponer nuevo horario"
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#FFAB00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ↺
                    </button>
                    <button
                      onClick={() => mostrarDetalle(cita)}
                      title="Ver detalles"
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#0052CC',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ...
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles de cita */}
      {detalleCita && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Detalles de la Cita
              </h3>
              <button
                onClick={() => setDetalleCita(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6B778C'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Paciente:</strong> {detalleCita.paciente}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Dentista:</strong> {detalleCita.dentista}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Tipo de cita:</strong> {detalleCita.tipo}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Motivo:</strong> {detalleCita.motivo}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Fecha:</strong> {detalleCita.fecha}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Hora:</strong> {detalleCita.hora}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Estado:</strong> 
              <span style={{
                marginLeft: '8px',
                padding: '2px 8px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: estados[detalleCita.estado]?.color + '20',
                color: estados[detalleCita.estado]?.color
              }}>
                {estados[detalleCita.estado]?.texto}
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => setDetalleCita(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  // Acción para cancelar cita
                  setCitas(citas.filter(c => c.id !== detalleCita.id));
                  setDetalleCita(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF5630',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginLeft: '8px'
                }}
              >
                Cancelar Cita
              </button>
              <button
                onClick={() => {
                  // Acción para cambio de hora
                  proponerCambio(detalleCita.id);
                  setDetalleCita(null);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFAB00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  marginLeft: '8px'
                }}
              >
                Cambiar Hora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitasDelDia;