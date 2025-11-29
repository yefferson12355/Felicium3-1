import React from 'react';

// Este componente es una versión simplificada que puede ser reutilizado
// en conjunto con el odontograma o como parte principal del historial clínico
const HistorialClinico = ({ pacienteId }) => {
  // Este componente forma parte del historial clínico del paciente
  // que ya está implementado en el componente VistaPaciente
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 600, 
        color: '#172B4D', 
        marginBottom: '20px' 
      }}>
        Historial Clínico del Paciente
      </h2>
      
      <p>Este es un componente auxiliar que puede ser usado para mostrar información específica del historial clínico.</p>
      <p>Ya está implementado como parte del módulo de Vista de Paciente, que incluye el odontograma interactivo, antecedentes clínicos y archivos médicos.</p>
    </div>
  );
};

export default HistorialClinico;