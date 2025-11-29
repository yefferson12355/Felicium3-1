import React, { useState } from 'react';

const GestionarCitas = () => {
  const [citas, setCitas] = useState([
    { id: 1, fecha: '15 Nov 2025', hora: '10:00', dentista: 'Dra. López', tipo: 'Limpieza', estado: 'confirmada' },
    { id: 2, fecha: '18 Nov 2025', hora: '14:30', dentista: 'Dr. Pérez', tipo: 'Endodoncia', estado: 'confirmada' },
    { id: 3, fecha: '22 Nov 2025', hora: '09:00', dentista: 'Dra. Gómez', tipo: 'Revisión', estado: 'pendiente' },
    { id: 4, fecha: '10 Nov 2025', hora: '11:00', dentista: 'Dr. Rojas', tipo: 'Extracción', estado: 'cancelada' }
  ]);

  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showPostergarModal, setShowPostergarModal] = useState(false);
  const [postergarData, setPostergarData] = useState({ razon: '', nuevaFecha: '', nuevaHora: '' });

  const cancelarCita = (id) => {
    setCitaSeleccionada(id);
    setShowCancelarModal(true);
  };

  const confirmarCancelar = () => {
    setCitas(citas.map(cita =>
      cita.id === citaSeleccionada ? { ...cita, estado: 'cancelada' } : cita
    ));
    setShowCancelarModal(false);
    setCitaSeleccionada(null);
  };

  const postergarCita = (id) => {
    setCitaSeleccionada(id);
    setPostergarData({ razon: '', nuevaFecha: '', nuevaHora: '' });
    setShowPostergarModal(true);
  };

  const confirmarPostergar = () => {
    if (!postergarData.razon || !postergarData.nuevaFecha || !postergarData.nuevaHora) {
      alert('Por favor complete todos los campos');
      return;
    }

    setCitas(citas.map(cita =>
      cita.id === citaSeleccionada
        ? {
            ...cita,
            fecha: postergarData.nuevaFecha,
            hora: postergarData.nuevaHora,
            estado: 'reprogramada'
          }
        : cita
    ));

    setShowPostergarModal(false);
    setCitaSeleccionada(null);
    setPostergarData({ razon: '', nuevaFecha: '', nuevaHora: '' });
  };

  const cancelarPostergar = () => {
    setShowPostergarModal(false);
    setCitaSeleccionada(null);
    setPostergarData({ razon: '', nuevaFecha: '', nuevaHora: '' });
  };

  return (
    <div style={{ marginTop: '20px' }}>
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
                textAlign: 'left',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Fecha/Hora
              </th>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Dentista
              </th>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Tipo
              </th>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Estado
              </th>
              <th style={{
                textAlign: 'left',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id} style={{
                borderBottom: '1px solid #DFE1E6'
              }}>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  {cita.fecha} a las {cita.hora}
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  {cita.dentista}
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  {cita.tipo}
                </td>
                <td style={{
                  padding: '12px'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: 500,
                    backgroundColor: 
                      cita.estado === 'confirmada' ? '#E6FCBF' : 
                      cita.estado === 'pendiente' ? '#FFFAE6' : 
                      '#FFEBE6',
                    color: 
                      cita.estado === 'confirmada' ? '#36B37E' : 
                      cita.estado === 'pendiente' ? '#FF991F' : 
                      '#BF2600'
                  }}>
                    {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                  </span>
                </td>
                <td style={{
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Postergar button - available for all states except cancelada */}
                    {cita.estado !== 'cancelada' && (
                      <button
                        onClick={() => postergarCita(cita.id)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #FF8B00',
                          backgroundColor: 'white',
                          color: '#FF8B00',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        title="Postergar cita"
                      >
                        Postergar
                      </button>
                    )}

                    {/* Cancelar button - available for all states except cancelada */}
                    {cita.estado !== 'cancelada' && (
                      <button
                        onClick={() => cancelarCita(cita.id)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid #FF5630',
                          backgroundColor: 'white',
                          color: '#FF5630',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        title="Cancelar cita"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button style={{
        marginTop: '16px',
        padding: '8px 16px',
        backgroundColor: '#0052CC',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        Nueva cita
      </button>

      {/* Modal de confirmación para cancelar cita */}
      {showCancelarModal && (
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
            padding: '24px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: 600,
              color: '#172B4D'
            }}>
              Confirmar cancelación
            </h3>
            <p style={{
              margin: '0 0 20px 0',
              color: '#172B4D',
              lineHeight: '1.5'
            }}>
              ¿Está seguro que desea cancelar esta cita? Esta acción no se puede deshacer.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px'
            }}>
              <button
                onClick={() => setShowCancelarModal(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  color: '#172B4D',
                  cursor: 'pointer'
                }}
              >
                Volver
              </button>
              <button
                onClick={confirmarCancelar}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FF5630',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancelar cita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para postergar cita */}
      {showPostergarModal && (
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
            padding: '24px',
            width: '450px',
            maxWidth: '90%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: 600,
              color: '#172B4D'
            }}>
              Postergar cita
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                color: '#172B4D'
              }}>
                Razón de la postergación
              </label>
              <textarea
                value={postergarData.razon}
                onChange={(e) => setPostergarData({ ...postergarData, razon: e.target.value })}
                placeholder="Ingrese la razón para postergar la cita"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  minHeight: '80px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                  color: '#172B4D'
                }}>
                  Nueva fecha
                </label>
                <input
                  type="date"
                  value={postergarData.nuevaFecha}
                  onChange={(e) => setPostergarData({ ...postergarData, nuevaFecha: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #DFE1E6',
                    borderRadius: '3px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                  color: '#172B4D'
                }}>
                  Nueva hora
                </label>
                <input
                  type="time"
                  value={postergarData.nuevaHora}
                  onChange={(e) => setPostergarData({ ...postergarData, nuevaHora: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #DFE1E6',
                    borderRadius: '3px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px'
            }}>
              <button
                onClick={cancelarPostergar}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  color: '#172B4D',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarPostergar}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Postergar cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarCitas;