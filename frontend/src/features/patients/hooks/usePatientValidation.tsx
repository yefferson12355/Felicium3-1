import { useCallback } from 'react';

const usePatientValidation = () => {
  const validatePatientData = useCallback((formData) => {
    const requiredFields = [
      'dni', 'nombre', 'apellido', 'fechaNacimiento',
      'celular', 'ciudad', 'departamento', 'direccion',
      'email', 'sexo'
    ];

    // Check required fields
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return { isValid: false, error: `Por favor complete todos los campos obligatorios` };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, error: 'Por favor ingrese un email válido' };
    }

    // Validate cell phone format (minimum 9 digits)
    if (formData.celular.length < 9) {
      return { isValid: false, error: 'El número de celular debe tener al menos 9 dígitos' };
    }

    // Validate DNI format (minimum 8 digits)
    if (formData.dni.length < 8) {
      return { isValid: false, error: 'El DNI debe tener al menos 8 dígitos' };
    }

    return { isValid: true, error: null };
  }, []);

  return { validatePatientData };
};

export default usePatientValidation;