import React, { useState } from 'react';

const PagosFacturacion = () => {
  // Mock data for payments combining both pending and historical payments
  const todosLosPagos = [
    { id: 1, fecha: '10 Nov 2025', tratamiento: 'Limpieza profunda', montoTotal: 150.00, deuda: 150.00, pzaDent: '001/2025', firmaConformidad: false },
    { id: 2, fecha: '15 Nov 2025', tratamiento: 'Empaste', montoTotal: 80.00, deuda: 30.00, pzaDent: '002/2025', firmaConformidad: true },
    { id: 3, fecha: '20 Nov 2025', tratamiento: 'Extracción', montoTotal: 120.00, deuda: 0.00, pzaDent: '003/2025', firmaConformidad: true },
    { id: 4, fecha: '05 Nov 2025', tratamiento: 'Limpieza', montoTotal: 200.00, deuda: 0.00, pzaDent: '004/2025', firmaConformidad: true },
    { id: 5, fecha: '28 Oct 2025', tratamiento: 'Empaste', montoTotal: 150.00, deuda: 0.00, pzaDent: '005/2025', firmaConformidad: true },
    { id: 6, fecha: '15 Oct 2025', tratamiento: 'Revisión', montoTotal: 100.00, deuda: 0.00, pzaDent: '006/2025', firmaConformidad: true }
  ];

  return (
    <div>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 600,
        color: '#172B4D',
        marginBottom: '20px'
      }}>
        Pagos
      </h2>

      <div style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Filtrar por fecha"
            style={{
              padding: '8px 12px',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px'
            }}
          />
          <button style={{
            padding: '8px 12px',
            backgroundColor: '#0052CC',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Filtrar
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
                  Monto Total (S/.)
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Deuda (S/.)
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Tratamiento
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Pza DENT.
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Firma Conformidad
                </th>
              </tr>
            </thead>
            <tbody>
              {todosLosPagos.map((pago) => (
                <tr key={pago.id} style={{
                  borderBottom: '1px solid #DFE1E6'
                }}>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {pago.fecha}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {pago.montoTotal.toFixed(2)}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {pago.deuda.toFixed(2)}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {pago.tratamiento}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {pago.pzaDent}
                  </td>
                  <td style={{
                    padding: '12px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '3px',
                      fontSize: '12px',
                      fontWeight: 500,
                      backgroundColor: pago.firmaConformidad ? '#E6FCBF' : '#FFEBE6',
                      color: pago.firmaConformidad ? '#36B37E' : '#BF2600'
                    }}>
                      {pago.firmaConformidad ? 'Sí' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '16px',
          gap: '8px'
        }}>
          <button style={{
            padding: '6px 12px',
            border: '1px solid #DFE1E6',
            backgroundColor: 'white',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Anterior
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              style={{
                padding: '6px 10px',
                border: page === 1 ? '1px solid #0052CC' : '1px solid #DFE1E6',
                backgroundColor: page === 1 ? '#0052CC' : 'white',
                color: page === 1 ? 'white' : '#172B4D',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
          <button style={{
            padding: '6px 12px',
            border: '1px solid #DFE1E6',
            backgroundColor: 'white',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagosFacturacion;