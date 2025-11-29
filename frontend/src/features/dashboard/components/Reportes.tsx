import React, { useState } from 'react';

const Reportes = () => {
  const [periodo, setPeriodo] = useState({ inicio: '', fin: '' });
  const [tipoReporte, setTipoReporte] = useState('citas'); // 'citas', 'doctores', 'pagos'

  // Datos de ejemplo para los reportes
  const datosCitas = [
    { dia: 'Lun', citas: 12 },
    { dia: 'Mar', citas: 15 },
    { dia: 'Mie', citas: 8 },
    { dia: 'Jue', citas: 18 },
    { dia: 'Vie', citas: 10 },
    { dia: 'Sab', citas: 6 },
    { dia: 'Dom', citas: 3 }
  ];

  const datosDoctores = [
    { nombre: 'Dr. López', citas: 45, aceptadas: 40, canceladas: 5 },
    { nombre: 'Dra. Rojas', citas: 38, aceptadas: 35, canceladas: 3 },
    { nombre: 'Dr. Gómez', citas: 32, aceptadas: 28, canceladas: 4 },
    { nombre: 'Dra. Martínez', citas: 25, aceptadas: 22, canceladas: 3 }
  ];

  const datosEstados = [
    { estado: 'Aceptadas', cantidad: 135, porcentaje: 75 },
    { estado: 'Canceladas', cantidad: 15, porcentaje: 25 }
  ];

  const exportarExcel = () => {
    // En una aplicación real, esto generaría un archivo Excel
    alert('Exportando reporte a Excel...');
  };

  const exportarPantalla = () => {
    // En una aplicación real, esto capturaría la pantalla para exportar
    alert('Exportando pantalla completa...');
  };

  // Componente de gráfico de barras
  const GraficoBarras = ({ datos, titulo }) => {
    const valores = datos.map(item => item.citas || item.cantidad);
    const maxValor = Math.max(...valores, 10); // mínimo para que se vea algo

    return (
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#172B4D', 
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {titulo}
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'end', 
          justifyContent: 'space-around', 
          height: '200px',
          border: '1px solid #DFE1E6',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#FAFBFC'
        }}>
          {datos.map((dato, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '30px', 
                height: `${(dato.citas / maxValor) * 180}px`,
                backgroundColor: tipoReporte === 'doctores' ? 
                  ['#0052CC', '#FF5630', '#FFAB00', '#36B37E'][index % 4] : 
                  '#0052CC',
                borderRadius: '4px 4px 0 0',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {dato.citas || dato.cantidad}
              </div>
              <div style={{ fontSize: '12px', color: '#172B4D' }}>
                {dato.dia || dato.nombre || dato.estado}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Componente de gráfico circular
  const GraficoCircular = ({ datos, titulo }) => {
    const radios = [];
    let startAngle = 0;
    
    const total = datos.reduce((sum, item) => sum + item.cantidad, 0);
    
    datos.forEach(dato => {
      const angle = (dato.cantidad / total) * 360;
      radios.push({
        ...dato,
        startAngle,
        endAngle: startAngle + angle
      });
      startAngle += angle;
    });

    const center = 100;
    const radio = 80;
    const colors = ['#36B37E', '#FF5630', '#FFAB00', '#0052CC'];

    return (
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#172B4D', 
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {titulo}
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            {radios.map((radioData, index) => {
              const start = polarToCartesian(center, center, radio, radioData.startAngle);
              const end = polarToCartesian(center, center, radio, radioData.endAngle);
              const largeArcFlag = radioData.endAngle - radioData.startAngle <= 180 ? "0" : "1";
              
              const pathData = [
                "M", center, center,
                "L", start.x, start.y,
                "A", radio, radio, 0, largeArcFlag, 1, end.x, end.y,
                "L", center, center
              ].join(" ");
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                />
              );
            })}
            <circle cx={center} cy={center} r={radio * 0.5} fill="white" />
            <text x={center} y={center} textAnchor="middle" dy=".3em" style={{ fill: '#172B4D', fontSize: '14px', fontWeight: 'bold' }}>
              {total}
            </text>
          </svg>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '10px',
          textAlign: 'left'
        }}>
          {datos.map((dato, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: colors[index % colors.length],
                  borderRadius: '50%'
                }}
              ></div>
              <div>
                <div style={{ fontSize: '14px', color: '#172B4D' }}>
                  {dato.estado}: {dato.cantidad} ({dato.porcentaje}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Función auxiliar para convertir coordenadas polares a cartesianas
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 600, 
        color: '#172B4D', 
        marginBottom: '20px' 
      }}>
        Reportes
      </h2>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              color: '#172B4D', 
              fontSize: '14px', 
              fontWeight: 500 
            }}>
              Fecha Inicio
            </label>
            <input
              type="date"
              value={periodo.inicio}
              onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
              style={{
                padding: '8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                width: '150px'
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              color: '#172B4D', 
              fontSize: '14px', 
              fontWeight: 500 
            }}>
              Fecha Final
            </label>
            <input
              type="date"
              value={periodo.fin}
              onChange={(e) => setPeriodo({...periodo, fin: e.target.value})}
              style={{
                padding: '8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                width: '150px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button
              onClick={() => {
                // En una aplicación real, esto filtraría los datos según el periodo
                alert('Filtrando datos por periodo seleccionado');
              }}
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
              Filtrar
            </button>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setTipoReporte('citas')}
            style={{
              padding: '8px 16px',
              backgroundColor: tipoReporte === 'citas' ? '#0052CC' : '#F4F5F7',
              color: tipoReporte === 'citas' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Gráfico de Citas por Días
          </button>
          <button
            onClick={() => setTipoReporte('estados')}
            style={{
              padding: '8px 16px',
              backgroundColor: tipoReporte === 'estados' ? '#0052CC' : '#F4F5F7',
              color: tipoReporte === 'estados' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Diagrama Circular Citas
          </button>
          <button
            onClick={() => setTipoReporte('doctores')}
            style={{
              padding: '8px 16px',
              backgroundColor: tipoReporte === 'doctores' ? '#0052CC' : '#F4F5F7',
              color: tipoReporte === 'doctores' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Gráficos por Doctor
          </button>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h3 style={{ 
            margin: 0,
            fontSize: '20px', 
            fontWeight: 600, 
            color: '#172B4D' 
          }}>
            {tipoReporte === 'citas' && 'Gráfico de Barras - Citas por Días'}
            {tipoReporte === 'estados' && 'Diagrama Circular - Citas Aceptadas vs Canceladas'}
            {tipoReporte === 'doctores' && 'Gráfico de Barras - Citas por Doctor'}
          </h3>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={exportarExcel}
              style={{
                padding: '8px 16px',
                backgroundColor: '#36B37E',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Exportar a Excel
            </button>
            <button
              onClick={exportarPantalla}
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
              Exportar Pantalla Completa
            </button>
          </div>
        </div>
        
        <div>
          {tipoReporte === 'citas' && (
            <GraficoBarras datos={datosCitas} titulo="Citas por Día" />
          )}
          
          {tipoReporte === 'estados' && (
            <GraficoCircular datos={datosEstados} titulo="Distribución de Citas" />
          )}
          
          {tipoReporte === 'doctores' && (
            <div>
              <GraficoBarras datos={datosDoctores} titulo="Citas por Doctor" />
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px',
                marginTop: '20px'
              }}>
                {datosDoctores.map((dato, index) => (
                  <div key={index} style={{
                    border: '1px solid #DFE1E6',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#FAFBFC'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 12px 0', 
                      fontSize: '16px', 
                      fontWeight: 600, 
                      color: '#172B4D' 
                    }}>
                      {dato.nombre}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ padding: '8px', backgroundColor: '#36B37E20', borderRadius: '4px' }}>
                        <div style={{ fontSize: '12px', color: '#6B778C' }}>Aceptadas</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#36B37E' }}>{dato.aceptadas}</div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#FF563020', borderRadius: '4px' }}>
                        <div style={{ fontSize: '12px', color: '#6B778C' }}>Canceladas</div>
                        <div style={{ fontSize: '18px', fontWeight: 600, color: '#FF5630' }}>{dato.canceladas}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;