import { useState } from 'react';

export const usePatientForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    celular: '',
    ciudad: '',
    direccion: '',
    email: '',
    sexo: '',
    observaciones: '',
    convenio: '',
    dentista_cargo: '',
    apoderado: '',
    departamento: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const updateField = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const resetForm = (data = {}) => {
    setFormData({
      dni: '',
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      celular: '',
      ciudad: '',
      direccion: '',
      email: '',
      sexo: '',
      observaciones: '',
      convenio: '',
      dentista_cargo: '',
      apoderado: '',
      departamento: '',
      ...data
    });
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    updateField,
    handleChange,
    resetForm
  };
};