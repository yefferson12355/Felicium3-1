import React, { useState } from 'react';
import SolicitarCita from './SolicitarCita';
import GestionarCitas from './GestionarCitas';
import SolicitudesRecibidas from './SolicitudesRecibidas';

const CitasPaciente = () => {
  const [activeTab, setActiveTab] = useState('solicitudes');

  return (
    <div>
      <div style={{
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid #DFE1E6'
      }}>
        <button
          onClick={() => setActiveTab('solicitudes')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'solicitudes' ? '#0052CC' : 'transparent',
            color: activeTab === 'solicitudes' ? 'white' : '#172B4D',
            border: 'none',
            borderBottom: activeTab === 'solicitudes' ? 'none' : '1px solid #DFE1E6',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Comunicados Médicos
        </button>
        <button
          onClick={() => setActiveTab('solicitar')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'solicitar' ? '#0052CC' : 'transparent',
            color: activeTab === 'solicitar' ? 'white' : '#172B4D',
            border: 'none',
            borderBottom: activeTab === 'solicitar' ? 'none' : '1px solid #DFE1E6',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Solicitar Cita
        </button>
        <button
          onClick={() => setActiveTab('gestionar')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'gestionar' ? '#0052CC' : 'transparent',
            color: activeTab === 'gestionar' ? 'white' : '#172B4D',
            border: 'none',
            borderBottom: activeTab === 'gestionar' ? 'none' : '1px solid #DFE1E6',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500
          }}
        >
          Gestionar Citas
        </button>
      </div>

      {activeTab === 'solicitudes' && <SolicitudesRecibidas />}
      {activeTab === 'solicitar' && <SolicitarCita />}
      {activeTab === 'gestionar' && <GestionarCitas />}
    </div>
  );
};

export default CitasPaciente;