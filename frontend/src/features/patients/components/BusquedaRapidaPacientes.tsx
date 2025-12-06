import React, { useState } from 'react';

const BusquedaRapidaPacientes = () => {
  const [busqueda, setBusqueda] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('dni'); // 'dni' o 'nombre'
  
  // Datos de ejemplo de pacientes
  const pacientes = [
    { id: 1, dni: '12345678', nombre: 'Juan', apellido: 'Pérez', edad: 35, sexo: 'M' },
    { id: 2, dni: '87654321', nombre: 'María', apellido: 'González', edad: 28, sexo: 'F' },
    { id: 3, dni: '11223344', nombre: 'Carlos', apellido: 'Rodríguez', edad: 42, sexo: 'M' },
    { id: 4, dni: '55667788', nombre: 'Ana', apellido: 'Martínez', edad: 31, sexo: 'F' },
    { id: 5, dni: '99887766', nombre: 'Luis', apellido: 'Fernández', edad: 50, sexo: 'M' },
  ];

  const resultados = pacientes.filter(paciente => {
    if (tipoBusqueda === 'dni') {
      return paciente.dni.includes(busqueda);
    } else {
      return (paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
              paciente.apellido.toLowerCase().includes(busqueda.toLowerCase()));
    }
  }).slice(0, 5);

  const manejarCrearPaciente = () => {
    // Esta función abriría un modal o iría a la página de creación de paciente
    console.log('Crear nuevo paciente');
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
      padding: '20px'
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: 600, 
        color: '#172B4D', 
        marginBottom: '16px'
      }}>
        Búsqueda Rápida de Pacientes
      </h3>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <button
            onClick={() => setTipoBusqueda('dni')}
            style={{
              padding: '6px 12px',
              backgroundColor: tipoBusqueda === 'dni' ? '#0052CC' : '#F4F5F7',
              color: tipoBusqueda === 'dni' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            DNI
          </button>
          <button
            onClick={() => setTipoBusqueda('nombre')}
            style={{
              padding: '6px 12px',
              backgroundColor: tipoBusqueda === 'nombre' ? '#0052CC' : '#F4F5F7',
              color: tipoBusqueda === 'nombre' ? 'white' : '#172B4D',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Nombre
          </button>
        </div>
        
        <input
          type="text"
          placeholder={`Buscar paciente por ${tipoBusqueda === 'dni' ? 'DNI' : 'nombre'}...`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#FAFBFC'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0052CC'}
          onBlur={(e) => e.target.style.borderColor = '#DFE1E6'}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={manejarCrearPaciente}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0052CC',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Crear Paciente Nuevo
        </button>
      </div>
      
      <div>
        <h4 style={{ 
          fontSize: '14px', 
          fontWeight: 500, 
          color: '#172B4D', 
          marginBottom: '8px' 
        }}>
          Resultados:
        </h4>
        {resultados.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resultados.map((paciente) => (
              <div 
                key={paciente.id}
                onClick={() => console.log('Seleccionar paciente:', paciente.id)}
                style={{
                  padding: '10px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAFBFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <div>
                  <div style={{ fontWeight: 500, color: '#172B4D' }}>
                    {paciente.nombre} {paciente.apellido}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B778C' }}>
                    DNI: {paciente.dni} • Edad: {paciente.edad} • Sexo: {paciente.sexo}
                  </div>
                </div>
                <div style={{ fontSize: '16px', color: '#6B778C' }}>
                  →
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '12px', 
            textAlign: 'center', 
            color: '#6B778C', 
            fontStyle: 'italic' 
          }}>
            No se encontraron pacientes
          </div>
        )}
      </div>
    </div>
  );
};

export default BusquedaRapidaPacientes;