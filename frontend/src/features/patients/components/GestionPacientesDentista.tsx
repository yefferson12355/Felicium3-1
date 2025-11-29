import React, { useState } from 'react';
import VistaPaciente from './VistaPaciente'; // Reusing the patient view component

const GestionPacientesDentista = ({ userName = 'Dr. Juan Pérez' }) => {
  const [currentView, setCurrentView] = useState('lista');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para pacientes del doctor actual
  const pacientesDoctor = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 35, sexo: 'M', dni: '12345678', email: 'juan.perez@example.com', telefono: '+51 999 888 777', direccion: 'Av. Los Dientes 123', doctor: userName, convenio: 'Essalud', observaciones: 'Paciente regular' },
    { id: 2, nombre: 'María', apellido: 'González', edad: 28, sexo: 'F', dni: '87654321', email: 'maria.gonzalez@example.com', telefono: '+51 888 777 666', direccion: 'Calle Dental 456', doctor: userName, convenio: 'Particular', observaciones: 'Alergia a penicilina' },
    { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', edad: 45, sexo: 'M', dni: '11223344', email: 'carlos.rodriguez@example.com', telefono: '+51 777 666 555', direccion: 'Jr. Muela 789', doctor: userName, convenio: 'Rimac', observaciones: '' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', edad: 32, sexo: 'F', dni: '55667788', email: 'ana.martinez@example.com', telefono: '+51 666 555 444', direccion: 'Av. Odontología 321', doctor: userName, convenio: 'Particular', observaciones: 'Tratamiento de ortodoncia' },
    { id: 5, nombre: 'Luis', apellido: 'Fernández', edad: 40, sexo: 'M', dni: '99887766', email: 'luis.fernandez@example.com', telefono: '+51 555 444 333', direccion: 'Psj. Canino 654', doctor: userName, convenio: 'Essalud', observaciones: 'Bruxismo' },
    { id: 6, nombre: 'Sofía', apellido: 'López', edad: 25, sexo: 'F', dni: '44556677', email: 'sofia.lopez@example.com', telefono: '+51 444 333 222', direccion: 'Cra. Molar 987', doctor: userName, convenio: 'Particular', observaciones: 'Primera consulta programada' },
  ];

  const [patients, setPatients] = useState(pacientesDoctor);

  // Filtrar pacientes según el término de búsqueda
  const filteredPatients = patients.filter(patient =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dni.includes(searchTerm)
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('detalle');
  };

  const handleBackToList = () => {
    setCurrentView('lista');
    setSelectedPatient(null);
  };

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
          Mis Pacientes
        </h2>
      </div>

      {currentView === 'lista' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Buscar paciente por nombre o DNI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                width: '300px'
              }}
            />
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
                    Nombre
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#172B4D'
                  }}>
                    Apellido
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#172B4D'
                  }}>
                    Edad
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#172B4D'
                  }}>
                    Sexo
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id} 
                    style={{
                      borderBottom: '1px solid #DFE1E6',
                      cursor: 'pointer'
                    }}
                    onClick={() => handlePatientClick(patient)}
                  >
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {patient.nombre}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {patient.apellido}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {patient.edad}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      {patient.sexo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {currentView === 'detalle' && selectedPatient && (
        <VistaPaciente 
          patient={selectedPatient} 
          onBack={handleBackToList} 
        />
      )}
    </div>
  );
};

export default GestionPacientesDentista;