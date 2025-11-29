import React, { useState } from 'react';
import Odontograma from '../../medical/components/Odontograma';
import PatientDetailsForm from './PatientDetailsForm';
import AppointmentHistoryTable from './AppointmentHistoryTable';
import PaymentHistoryTable from './PaymentHistoryTable';
import ClinicalHistorySection from './ClinicalHistorySection';
import ClinicalFilesSection from './ClinicalFilesSection';

const VistaPaciente = ({ patient, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({...patient});
  const [activeTab, setActiveTab] = useState('datos');

  // Datos de ejemplo para historiales
  const citas = [
    { id: 1, fecha: '2025-10-15', hora: '10:30', tipo: 'Limpieza', dentista: 'Dr. López' },
    { id: 2, fecha: '2025-10-01', hora: '14:00', tipo: 'Revisión', dentista: 'Dra. Rojas' },
    { id: 3, fecha: '2025-09-20', hora: '09:15', tipo: 'Endodoncia', dentista: 'Dr. Gómez' },
  ];

  const pagos = [
    { id: 1, fecha: '2025-10-15', concepto: 'Limpieza dental', monto: 150.00, metodo: 'Efectivo', estado: 'Pagado' },
    { id: 2, fecha: '2025-10-01', concepto: 'Revisión general', monto: 100.00, metodo: 'Tarjeta', estado: 'Pagado' },
    { id: 3, fecha: '2025-09-20', concepto: 'Endodoncia', monto: 450.00, metodo: 'Tarjeta', estado: 'Pendiente' },
  ];

  const enfermedades = [
    { id: 1, nombre: 'Diabetes' },
    { id: 2, nombre: 'Hipertensión' },
  ];

  const alergias = [
    { id: 1, nombre: 'Penicilina' },
  ];

  const [newEnfermedad, setNewEnfermedad] = useState('');
  const [newAlergia, setNewAlergia] = useState('');
  const [archivos, setArchivos] = useState([
    { id: 1, nombre: 'Radiografía panorámica', tipo: 'Imagen', descripcion: 'Radiografía de toda la boca' },
    { id: 2, nombre: 'Historial médico', tipo: 'Documento', descripcion: 'Formulario médico inicial' },
  ]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [tipoArchivo, setTipoArchivo] = useState('');
  const [descripcionArchivo, setDescripcionArchivo] = useState('');
  const [archivosParaSubir, setArchivosParaSubir] = useState([]);

  const tiposArchivo = ['Imagen', 'Documento', 'PDF', 'Video', 'Audio', 'Otro'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // En una aplicación real, aquí se actualizarían los datos en el backend
    alert('Datos actualizados correctamente');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient({...patient});
  };

  const handleAgregarEnfermedad = () => {
    if (newEnfermedad.trim() !== '') {
      // En una aplicación real, aquí se agregaría al paciente
      setNewEnfermedad('');
    }
  };

  const handleAgregarAlergia = () => {
    if (newAlergia.trim() !== '') {
      // En una aplicación real, aquí se agregaría al paciente
      setNewAlergia('');
    }
  };

  const handleSubirArchivo = () => {
    if (archivosParaSubir.length > 0 && tipoArchivo && descripcionArchivo) {
      // En una aplicación real, aquí se subirían los archivos
      const nuevosArchivos = archivosParaSubir.map((file, index) => ({
        id: archivos.length + index + 1,
        nombre: file.name,
        tipo: tipoArchivo,
        descripcion: descripcionArchivo
      }));
      setArchivos([...archivos, ...nuevosArchivos]);
      setArchivosParaSubir([]);
      setTipoArchivo('');
      setDescripcionArchivo('');
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setArchivosParaSubir(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setArchivosParaSubir(files);
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
          {patient.nombre} {patient.apellido}
        </h2>
        <button
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: '#0052CC',
            border: '1px solid #0052CC',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Volver
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid #DFE1E6'
      }}>
        <button
          onClick={() => setActiveTab('datos')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'datos' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'datos' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'datos' ? '500' : '400',
            color: activeTab === 'datos' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Datos del Paciente
        </button>
        <button
          onClick={() => setActiveTab('historial-citas')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'historial-citas' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'historial-citas' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'historial-citas' ? '500' : '400',
            color: activeTab === 'historial-citas' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Historial de Citas
        </button>
        <button
          onClick={() => setActiveTab('odontograma')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'odontograma' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'odontograma' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'odontograma' ? '500' : '400',
            color: activeTab === 'odontograma' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Odontograma
        </button>
        <button
          onClick={() => setActiveTab('antecedentes')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'antecedentes' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'antecedentes' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'antecedentes' ? '500' : '400',
            color: activeTab === 'antecedentes' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Antecedentes Clínicos
        </button>
        <button
          onClick={() => setActiveTab('pagos')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'pagos' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'pagos' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'pagos' ? '500' : '400',
            color: activeTab === 'pagos' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Pagos
        </button>
        <button
          onClick={() => setActiveTab('archivos')}
          style={{
            padding: '8px 16px',
            backgroundColor: activeTab === 'archivos' ? '#DEEBFF' : 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'archivos' ? '#0052CC' : 'transparent'}`,
            cursor: 'pointer',
            fontWeight: activeTab === 'archivos' ? '500' : '400',
            color: activeTab === 'archivos' ? '#0052CC' : '#172B4D',
            borderRadius: '3px 3px 0 0'
          }}
        >
          Archivos Clínicos
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'datos' && (
        <PatientDetailsForm
          patient={patient}
          editedPatient={editedPatient}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          setIsEditing={setIsEditing}
        />
      )}

      {activeTab === 'historial-citas' && (
        <AppointmentHistoryTable citas={citas} />
      )}

      {activeTab === 'odontograma' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <Odontograma />
        </div>
      )}

      {activeTab === 'antecedentes' && (
        <ClinicalHistorySection
          enfermedades={enfermedades}
          alergias={alergias}
          newEnfermedad={newEnfermedad}
          newAlergia={newAlergia}
          setNewEnfermedad={setNewEnfermedad}
          setNewAlergia={setNewAlergia}
          handleAgregarEnfermedad={handleAgregarEnfermedad}
          handleAgregarAlergia={handleAgregarAlergia}
        />
      )}

      {activeTab === 'pagos-detalle' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: 600,
            color: '#172B4D'
          }}>
            Detalle de Pagos
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
                    Monto Total
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#172B4D'
                  }}>
                    Importe
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#172B4D'
                  }}>
                    Deuda
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
                    Pza Dent
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
                      S/ {pago.monto.toFixed(2)}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      S/ {pago.monto.toFixed(2)}
                    </td>
                    <td style={{
                      padding: '12px',
                      color: '#172B4D'
                    }}>
                      S/ 0.00
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
      )}

      {activeTab === 'pagos' && (
        <PaymentHistoryTable pagos={pagos} />
      )}

      {activeTab === 'archivos' && (
        <ClinicalFilesSection
          archivos={archivos}
          archivosParaSubir={archivosParaSubir}
          tipoArchivo={tipoArchivo}
          descripcionArchivo={descripcionArchivo}
          tiposArchivo={tiposArchivo}
          archivoSeleccionado={archivoSeleccionado}
          setTipoArchivo={setTipoArchivo}
          setDescripcionArchivo={setDescripcionArchivo}
          handleFileChange={handleFileChange}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleSubirArchivo={handleSubirArchivo}
          setArchivos={setArchivos}
        />
      )}
    </div>
  );
};

export default VistaPaciente;