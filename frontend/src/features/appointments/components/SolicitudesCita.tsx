import React, { useState } from 'react';

const SolicitudesCita = () => {
  const [solicitudes, setSolicitudes] = useState([
    { 
      id: 1, 
      paciente: 'Juan Pérez', 
      dentista: 'Dr. López', 
      motivo: 'Deseo cambiar mi cita del viernes por la mañana',
      fecha: '12 Nov 2025',
      hora: '09:00',
      estado: 'pendiente',
      tipo_cita: 'Revisión'
    },
    { 
      id: 2, 
      paciente: 'María González', 
      dentista: 'Dra. Rojas', 
      motivo: 'Necesito una cita para una limpieza dental',
      fecha: '13 Nov 2025',
      hora: '11:00',
      estado: 'pendiente',
      tipo_cita: 'Limpieza'
    },
    { 
      id: 3, 
      paciente: 'Carlos Rodríguez', 
      dentista: 'Dr. Gómez', 
      motivo: 'Quiero adelantar mi cita programada para la próxima semana',
      fecha: '14 Nov 2025',
      hora: '15:30',
      estado: 'aprobada',
      tipo_cita: 'Tratamiento'
    }
  ]);
  
  const [detalleSolicitud, setDetalleSolicitud] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState('hoy'); // 'hoy', 'esta_semana', 'personalizado'
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const aprobarSolicitud = (id) => {
    setSolicitudes(solicitudes.map(solicitud => 
      solicitud.id === id ? { ...solicitud, estado: 'aprobada' } : solicitud
    ));
    // En una app real, esto también actualizaría el calendario
  };

  const rechazarSolicitud = (id) => {
    setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
  };

  const proponerNuevoHorario = (id) => {
    // En una app real, esto abriría un modal para proponer nuevo horario
    console.log('Proponer nuevo horario para solicitud:', id);
  };

  const mostrarDetalle = (solicitud) => {
    setDetalleSolicitud(solicitud);
  };

  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    if (filtroFecha === 'hoy') {
      return solicitud.fecha === '12 Nov 2025'; // Fecha de hoy
    }
    return true; // Mostrar todas las demás
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 600, 
        color: '#172B4D', 
        marginBottom: '20px' 
      }}>
        Solicitudes de Cita
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center', 
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <label style={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: '#172B4D',
            whiteSpace: 'nowrap'
          }}>
            Filtro de Fechas:
          </label>
          <button
            onClick={() => setFiltroFecha('hoy')}
            style={{
              padding: '6px 12px',
              backgroundColor: filtroFecha === 'hoy' ? '#0052CC' : '#F4F5F7',
              color: filtroFecha === 'hoy' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Hoy
          </button>
          <button
            onClick={() => setFiltroFecha('esta_semana')}
            style={{
              padding: '6px 12px',
              backgroundColor: filtroFecha === 'esta_semana' ? '#0052CC' : '#F4F5F7',
              color: filtroFecha === 'esta_semana' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Esta Semana
          </button>
          <button
            onClick={() => setFiltroFecha('personalizado')}
            style={{
              padding: '6px 12px',
              backgroundColor: filtroFecha === 'personalizado' ? '#0052CC' : '#F4F5F7',
              color: filtroFecha === 'personalizado' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Personalizado
          </button>
          
          {filtroFecha === 'personalizado' && (
            <>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                style={{
                  padding: '6px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  fontSize: '14px'
                }}
              />
              <span style={{ color: '#6B778C' }}>a</span>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                style={{
                  padding: '6px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  fontSize: '14px'
                }}
              />
            </>
          )}
        </div>
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
              }}>Tipo</th>
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
            {solicitudesFiltradas.map((solicitud) => (
              <tr key={solicitud.id} style={{
                borderBottom: '1px solid #DFE1E6'
              }}>
                <td style={{ padding: '12px', color: '#172B4D' }}>
                  {solicitud.paciente}
                </td>
                <td style={{ padding: '12px', color: '#172B4D' }}>
                  {solicitud.dentista}
                </td>
                <td style={{ padding: '12px', color: '#172B4D' }}>
                  {solicitud.motivo}
                </td>
                <td style={{ padding: '12px', color: '#172B4D' }}>
                  {solicitud.fecha} a las {solicitud.hora}
                </td>
                <td style={{ padding: '12px', color: '#172B4D' }}>
                  {solicitud.tipo_cita}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: 
                      solicitud.estado === 'pendiente' ? '#FF991F20' :
                      solicitud.estado === 'aprobada' ? '#36B37E20' : '#6B778C20',
                    color: 
                      solicitud.estado === 'pendiente' ? '#FF991F' :
                      solicitud.estado === 'aprobada' ? '#36B37E' : '#6B778C'
                  }}>
                    {solicitud.estado === 'pendiente' ? 'Pendiente' : 
                     solicitud.estado === 'aprobada' ? 'Aprobada' : 'Rechazada'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {solicitud.estado === 'pendiente' && (
                      <>
                        <button
                          onClick={() => aprobarSolicitud(solicitud.id)}
                          title="Aprobar solicitud"
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
                          ✓ Aprobar
                        </button>
                        <button
                          onClick={() => rechazarSolicitud(solicitud.id)}
                          title="Rechazar solicitud"
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
                          ✗ Rechazar
                        </button>
                      </>
                    )}
                    {solicitud.estado === 'pendiente' && (
                      <button
                        onClick={() => proponerNuevoHorario(solicitud.id)}
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
                        ↺ Proponer
                      </button>
                    )}
                    <button
                      onClick={() => mostrarDetalle(solicitud)}
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

      {/* Modal de detalles de solicitud */}
      {detalleSolicitud && (
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
                Detalles de la Solicitud
              </h3>
              <button
                onClick={() => setDetalleSolicitud(null)}
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
              <strong>Paciente:</strong> {detalleSolicitud.paciente}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Dentista:</strong> {detalleSolicitud.dentista}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Tipo de cita:</strong> {detalleSolicitud.tipo_cita}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Motivo de la solicitud:</strong> {detalleSolicitud.motivo}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Fecha/Hora solicitada:</strong> {detalleSolicitud.fecha} a las {detalleSolicitud.hora}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Estado actual:</strong> 
              <span style={{
                marginLeft: '8px',
                padding: '2px 8px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 500,
                backgroundColor: 
                  detalleSolicitud.estado === 'pendiente' ? '#FF991F20' :
                  detalleSolicitud.estado === 'aprobada' ? '#36B37E20' : '#6B778C20',
                color: 
                  detalleSolicitud.estado === 'pendiente' ? '#FF991F' :
                  detalleSolicitud.estado === 'aprobada' ? '#36B37E' : '#6B778C'
              }}>
                {detalleSolicitud.estado === 'pendiente' ? 'Pendiente' : 
                 detalleSolicitud.estado === 'aprobada' ? 'Aprobada' : 'Rechazada'}
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => setDetalleSolicitud(null)}
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
              
              {detalleSolicitud.estado === 'pendiente' && (
                <>
                  <button
                    onClick={() => {
                      aprobarSolicitud(detalleSolicitud.id);
                      setDetalleSolicitud(null);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#36B37E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginLeft: '8px'
                    }}
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => {
                      rechazarSolicitud(detalleSolicitud.id);
                      setDetalleSolicitud(null);
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
                    Rechazar
                  </button>
                  <button
                    onClick={() => {
                      proponerNuevoHorario(detalleSolicitud.id);
                      setDetalleSolicitud(null);
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
                    Proponer Horario
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitudesCita;