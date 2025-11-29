import React, { useState } from 'react';
import CalendarioSemanal from './CalendarioSemanal';
import FormularioAgendarCita from './FormularioAgendarCita';

const GestionCitasDentista = ({ userName = 'Dr. Juan Pérez' }) => {
  const [activeTab, setActiveTab] = useState('calendario'); // 'calendario' o 'diario'
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date()); // Fecha para la vista de citas del día

  // Datos de ejemplo para citas del doctor actual
  const citasDoctor = [
    { id: 1, hora: '09:00', paciente: 'Juan Pérez', dentista: userName, tipo: 'Limpieza', estado: 'confirmada', motivo: 'Revisión de rutina', tratamiento: 'Limpieza dental', fecha: '2025-11-13' },
    { id: 2, hora: '10:30', paciente: 'María González', dentista: userName, tipo: 'Revisión', estado: 'confirmada', motivo: 'Consulta general', tratamiento: 'Revisión bucal', fecha: '2025-11-13' },
    { id: 3, hora: '11:15', paciente: 'Carlos Rodríguez', dentista: userName, tipo: 'Endodoncia', estado: 'pendiente', motivo: 'Tratamiento de conducto', tratamiento: 'Endodoncia muela', fecha: '2025-11-13' },
    { id: 4, hora: '14:00', paciente: 'Ana Martínez', dentista: userName, tipo: 'Extracción', estado: 'confirmada', motivo: 'Muela del juicio', tratamiento: 'Extracción', fecha: '2025-11-14' },
    { id: 5, hora: '15:30', paciente: 'Luis Fernández', dentista: userName, tipo: 'Primera consulta', estado: 'pendiente', motivo: 'Dolor de muela', tratamiento: 'Consulta inicial', fecha: '2025-11-14' },
    { id: 6, hora: '09:30', paciente: 'Sofia López', dentista: userName, tipo: 'Revisión', estado: 'confirmada', motivo: 'Control post-operatorio', tratamiento: 'Control', fecha: '2025-11-15' },
    { id: 7, hora: '11:00', paciente: 'Roberto Díaz', dentista: userName, tipo: 'Blanqueamiento', estado: 'confirmada', motivo: 'Sesión de blanqueamiento', tratamiento: 'Blanqueamiento dental', fecha: '2025-11-15' },
  ];

  const [citas, setCitas] = useState(citasDoctor);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleHourSelect = (hourData) => {
    setSelectedDate(hourData.date);
    setSelectedHour(hourData.hour);
    setMostrarModal(true);
  };

  const handleConfirmCita = (cita) => {
    // Agregar la nueva cita a la lista
    const nuevaCita = {
      id: citas.length + 1,
      ...cita,
      estado: 'confirmada',
      dentista: userName,
      fecha: cita.fecha || new Date().toISOString().split('T')[0]
    };
    setCitas([...citas, nuevaCita]);
  };

  const estadosVisibles = ['pendiente', 'confirmada', 'completada'];
  const tiposEstado = {
    'pendiente': { color: '#FF991F', texto: 'Pendiente' },
    'confirmada': { color: '#36B37E', texto: 'Confirmada' },
    'completada': { color: '#0066CC', texto: 'Completada' },
  };

  const confirmarCita = (id) => {
    setCitas(citas.map(cita =>
      cita.id === id ? { ...cita, estado: 'confirmada' } : cita
    ));
  };

  const cancelarCita = (id) => {
    if (window.confirm('¿Cancelar cita de este paciente?')) {
      setCitas(citas.filter(cita => cita.id !== id));
    }
  };

  // Funciones para la navegación de fechas
  const cambiarFecha = (dias) => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(fechaSeleccionada.getDate() + dias);
    setFechaSeleccionada(nuevaFecha);
  };

  // Obtener citas para la fecha seleccionada
  const getCitasDelDia = () => {
    const fechaString = fechaSeleccionada.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    return citas.filter(cita => cita.fecha === fechaString);
  };

  const citasDelDia = getCitasDelDia();
  const fechaFormateada = fechaSeleccionada.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: '#172B4D'
        }}>
          Mis Citas
        </h2>
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
          Agendar Nueva Cita
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
          onClick={() => setActiveTab('diario')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'diario' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'diario' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'diario' ? '500' : '400',
            color: activeTab === 'diario' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Citas del Día
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'calendario' && (
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)', 
          padding: '16px' 
        }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#172B4D' 
          }}>
            Calendario Semanal
          </h3>
          <CalendarioSemanal
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            onHourSelect={handleHourSelect}
            role="dentista"
            currentUser={userName}
            citasExistentes={citas}
          />
        </div>
      )}

      {activeTab === 'diario' && (
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)', 
          padding: '16px' 
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '16px', 
              fontWeight: 600, 
              color: '#172B4D' 
            }}>
              Citas para {fechaFormateada}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => cambiarFecha(-1)}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F4F5F7',
                  color: '#172B4D',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                &lt; Anterior
              </button>
              <button
                onClick={() => cambiarFecha(1)}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#F4F5F7',
                  color: '#172B4D',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Siguiente &gt;
              </button>
            </div>
          </div>

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
                  Hora
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Paciente
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
              {citasDelDia.length > 0 ? (
                citasDelDia.map((cita) => (
                  <tr key={cita.id} style={{
                    borderBottom: '1px solid #DFE1E6'
                  }}>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {cita.hora}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {cita.paciente}
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
                        backgroundColor: tiposEstado[cita.estado]?.color + '20',
                        color: tiposEstado[cita.estado]?.color
                      }}>
                        {tiposEstado[cita.estado]?.texto}
                      </span>
                    </td>
                    <td style={{
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {cita.estado === 'pendiente' && (
                          <button
                            onClick={() => confirmarCita(cita.id)}
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
                            Confirmar
                          </button>
                        )}
                        <button
                          onClick={() => cancelarCita(cita.id)}
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
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{
                    padding: '12px',
                    textAlign: 'center',
                    color: '#6B778C',
                    fontStyle: 'italic'
                  }}>
                    No hay citas programadas para este día
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && (
        <FormularioAgendarCita
          onClose={() => setMostrarModal(false)}
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          onConfirm={handleConfirmCita}
        />
      )}
    </div>
  );
};

export default GestionCitasDentista;