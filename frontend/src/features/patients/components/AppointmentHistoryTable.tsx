import React from 'react';

const AppointmentHistoryTable = ({ citas }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '16px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Historial de Citas
      </h3>
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
                Fecha
              </th>
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
                Tipo de Cita
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
                  {cita.fecha}
                </td>
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
                  {cita.tipo}
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  {cita.dentista}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentHistoryTable;