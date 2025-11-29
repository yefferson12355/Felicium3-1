import React, { useState } from 'react';
import Modal from './Modal';
import PatientForm from './PatientForm';
import usePatientValidation from '../hooks/usePatientValidation';

const FormularioAgregarPaciente = ({ onClose, onAddPatient }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    celular: '',
    ciudad: '',
    apoderado: '',
    departamento: '',
    direccion: '',
    email: '',
    sexo: '',
    observaciones: '',
    convenio: '',
    doctor: '',
    firmaDigital: ''
  });

  const { validatePatientData } = usePatientValidation();

  const requiredFields = [
    'dni', 'nombre', 'apellido', 'fechaNacimiento',
    'celular', 'ciudad', 'departamento', 'direccion',
    'email', 'sexo', 'firmaDigital'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignatureChange = (signatureDataURL) => {
    setFormData(prev => ({
      ...prev,
      firmaDigital: signatureDataURL
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, error } = validatePatientData(formData);

    if (!isValid) {
      alert(error);
      return;
    }

    // Validar que la firma esté presente
    if (!formData.firmaDigital) {
      alert('Por favor, agregue la firma del paciente');
      return;
    }

    onAddPatient(formData);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Agregar Nuevo Paciente"
    >
      <form onSubmit={handleSubmit}>
        <PatientForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSignatureChange={handleSignatureChange}
          requiredFields={requiredFields}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #DFE1E6'
        }}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #0052CC',
              borderRadius: '3px',
              color: '#0052CC',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#0052CC',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Agregar Paciente
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormularioAgregarPaciente;