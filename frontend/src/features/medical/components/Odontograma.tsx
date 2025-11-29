import React, { useState } from 'react';

const Odontograma = () => {
  const [tipoDentadura, setTipoDentadura] = useState('permanente'); // 'permanente' o 'temporal'
  const [seleccionado, setSeleccionado] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState('sano');

  // Colores posibles para los dientes
  const colores = {
    caries: { color: '#FF0000', nombre: 'Caries (Rojo)', opacity: 0.4 },
    obturacion: { color: '#0000FF', nombre: 'Obturación (Azul)', opacity: 0.4 },
    sellante: { color: '#00FF00', nombre: 'Sellante (Verde)', opacity: 0.4 },
    endodoncia: { color: '#800080', nombre: 'Endodoncia (Púrpura)', opacity: 0.4 },
    corona: { color: '#FFFF00', nombre: 'Corona (Amarillo)', opacity: 0.4 },
    extraccion: { color: '#000000', nombre: 'Extracción (Negro)', opacity: 0.6 },
    sano: { color: 'transparent', nombre: 'Sano (Blanco)', opacity: 0 }
  };

  // Números de dientes para dentadura permanente (numeración universal)
  const dientesPermanentes = {
    superior: ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'],
    inferior: ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
  };

  // Números de dientes para dentadura temporal (numeración de dientes temporales)
  const dientesTemporales = {
    superior: ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65'],
    inferior: ['85', '84', '83', '82', '81', '71', '72', '73', '74', '75']
  };

  const dientes = tipoDentadura === 'permanente' ? dientesPermanentes : dientesTemporales;

  const [estadosDientes, setEstadosDientes] = useState(
    dientes.superior.concat(dientes.inferior).reduce((acc, diente) => {
      acc[diente] = 'sano';
      return acc;
    }, {})
  );

  const handleDienteClick = (numeroDiente) => {
    setSeleccionado(numeroDiente);
    // Aplicar el color seleccionado al diente
    setEstadosDientes(prev => ({
      ...prev,
      [numeroDiente]: colorSeleccionado
    }));
  };

  const limpiarSeleccion = () => {
    setSeleccionado(null);
  };

  // Función para obtener la ruta de la imagen del diente desde la carpeta public
  const getDienteImage = (numeroDiente) => {
    const tipo = tipoDentadura === 'permanente' ? 'permanentes' : 'temporales';
    const posicion = dientes.superior.includes(numeroDiente) ? 'dientes_arriba' : 'dientes_abajo';
    return `/odontrograma/${tipo}/${posicion}/${numeroDiente}.svg`;
  };

  // Componente para renderizar un diente
  const Diente = ({ numeroDiente }) => {
    const estado = estadosDientes[numeroDiente] || 'sano';
    const colorInfo = colores[estado];
    const imageSrc = getDienteImage(numeroDiente);

    return (
      <div
        onClick={() => handleDienteClick(numeroDiente)}
        style={{
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(seleccionado === numeroDiente ? {
            filter: 'drop-shadow(0 0 4px #0052CC)',
            transform: 'scale(1.1)'
          } : {})
        }}
        title={`Diente ${numeroDiente} - ${colorInfo.nombre}`}
      >
        {/* Imagen del diente */}
        <img
          src={imageSrc}
          alt={`Diente ${numeroDiente}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />

        {/* Overlay de color para el estado */}
        {estado !== 'sano' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colorInfo.color,
              opacity: colorInfo.opacity,
              pointerEvents: 'none',
              mixBlendMode: estado === 'extraccion' ? 'multiply' : 'normal'
            }}
          />
        )}

        {/* Número del diente */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#172B4D',
            backgroundColor: 'white',
            padding: '1px 3px',
            borderRadius: '2px',
            border: '1px solid #DFE1E6'
          }}
        >
          {numeroDiente}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: '500', color: '#172B4D' }}>
            Tipo de dentadura:
          </label>
          <select
            value={tipoDentadura}
            onChange={(e) => {
              setTipoDentadura(e.target.value);
              // Resetear selección al cambiar tipo de dentadura
              setSeleccionado(null);
            }}
            style={{
              padding: '4px 8px',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px'
            }}
          >
            <option value="permanente">Permanente</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: '500', color: '#172B4D' }}>
            Estado:
          </label>
          <div style={{ display: 'flex', gap: '5px' }}>
            {Object.entries(colores).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setColorSeleccionado(key)}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: value.color === 'transparent' ? '#FFFFFF' : value.color,
                  border: colorSeleccionado === key ? '3px solid #172B4D' : '1px solid #000',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
                title={value.nombre}
              />
            ))}
          </div>

          <button
            onClick={limpiarSeleccion}
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
            Limpiar
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        marginBottom: '20px'
      }}>
        {/* Dientes superiores */}
        <div style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '5px',
          paddingBottom: '20px'
        }}>
          {dientes.superior.map((numDiente) => (
            <Diente key={numDiente} numeroDiente={numDiente} />
          ))}
        </div>

        {/* Separador central (arcada dental) */}
        <div style={{
          width: '90%',
          height: '3px',
          backgroundColor: '#172B4D',
          margin: '0',
          borderRadius: '2px'
        }}></div>

        {/* Dientes inferiores */}
        <div style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '5px',
          paddingTop: '20px'
        }}>
          {dientes.inferior.map((numDiente) => (
            <Diente key={numDiente} numeroDiente={numDiente} />
          ))}
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#F4F5F7',
        borderRadius: '3px'
      }}>
        <p style={{ margin: 0, color: '#6B778C', fontSize: '12px' }}>
          {seleccionado
            ? `Diente seleccionado: ${seleccionado} - Estado: ${colores[estadosDientes[seleccionado]]?.nombre}`
            : 'Seleccione un estado y haga clic en un diente para aplicarlo'}
        </p>
      </div>
    </div>
  );
};

export default Odontograma;