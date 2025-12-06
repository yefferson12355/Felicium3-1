import { useState } from 'react';

interface PatientFormData {
  dni: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  celular: string;
  ciudad: string;
  direccion: string;
  email: string;
  sexo: string;
  observaciones: string;
  convenio: string;
  dentista_cargo: string;
  apoderado: string;
  departamento: string;
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

export const usePatientForm = (initialData: Partial<PatientFormData> = {}) => {
  const [formData, setFormData] = useState<PatientFormData>({
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

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (name: string, value: any) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const resetForm = (data: Partial<PatientFormData> = {}) => {
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