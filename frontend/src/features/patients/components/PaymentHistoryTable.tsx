import React from 'react';

const PaymentHistoryTable = ({ pagos }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '16px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Pagos
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
            {pagos.map((pago) => (
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
                  {pago.monto.toFixed(2)}
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  0.00
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  {pago.concepto}
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  ---
                </td>
                <td style={{
                  padding: '12px',
                  color: '#172B4D'
                }}>
                  <button
                    onClick={() => alert('Firma de conformidad')}
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
                    Firma
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;