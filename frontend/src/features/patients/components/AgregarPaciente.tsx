import React from 'react';
import InputField from './shared/InputField';
import SelectField from './shared/SelectField';
import TextareaField from './shared/TextareaField';
import { usePatientForm } from '../hooks/usePatientForm';
import { usePatientValidation } from '../hooks/usePatientValidation';

const AgregarPaciente = () => {
  const { formData, errors, setErrors, handleChange, resetForm } = usePatientForm();
  const { validateForm } = usePatientValidation();

  const dentistas = [
    { value: 'Dr. Pérez', label: 'Dr. Pérez' },
    { value: 'Dra. López', label: 'Dra. López' },
    { value: 'Dr. Gómez', label: 'Dr. Gómez' },
    { value: 'Dra. Rojas', label: 'Dra. Rojas' }
  ];

  const convenios = [
    { value: 'Particular', label: 'Particular' },
    { value: 'Essalud', label: 'Essalud' },
    { value: 'Prival', label: 'Prival' },
    { value: 'Otro', label: 'Otro' }
  ];

  const departamentos = [
    { value: 'Lima', label: 'Lima' },
    { value: 'Arequipa', label: 'Arequipa' },
    { value: 'Cusco', label: 'Cusco' },
    { value: 'Trujillo', label: 'Trujillo' },
    { value: 'Piura', label: 'Piura' },
    { value: 'Junín', label: 'Junín' },
    { value: 'Loreto', label: 'Loreto' }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // En una aplicación real, aquí se haría la llamada al backend
      console.log('Datos del paciente:', formData);
      alert('Paciente agregado exitosamente');
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClear = () => {
    resetForm();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#172B4D',
        marginBottom: '20px'
      }}>
        Agregar Nuevo Paciente
      </h2>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
        padding: '20px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {/* Campos obligatorios */}
            <InputField
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              error={errors.dni}
              placeholder="Ingrese DNI"
              required
            />

            <InputField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              placeholder="Ingrese nombre"
              required
            />

            <InputField
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              error={errors.apellido}
              placeholder="Ingrese apellido"
              required
            />

            <InputField
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              error={errors.fecha_nacimiento}
              required
            />

            <InputField
              label="Número Celular"
              name="celular"
              type="tel"
              value={formData.celular}
              onChange={handleChange}
              error={errors.celular}
              placeholder="Ingrese número de celular"
              required
            />

            <InputField
              label="Ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              error={errors.ciudad}
              placeholder="Ingrese ciudad"
              required
            />

            <InputField
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              error={errors.direccion}
              placeholder="Ingrese dirección"
              required
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Ingrese email"
              required
            />

            <SelectField
              label="Sexo"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              error={errors.sexo}
              placeholder="Seleccione sexo"
              options={[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Femenino' }
              ]}
              required
            />

            <SelectField
              label="Departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              error={errors.departamento}
              placeholder="Seleccione departamento"
              options={departamentos}
              required
            />

            {/* Campos no obligatorios */}
            <SelectField
              label="Convenio"
              name="convenio"
              value={formData.convenio}
              onChange={handleChange}
              placeholder="Sin convenio"
              options={convenios}
            />

            <SelectField
              label="Dentista a Cargo"
              name="dentista_cargo"
              value={formData.dentista_cargo}
              onChange={handleChange}
              placeholder="Seleccionar doctor"
              options={dentistas}
            />

            <InputField
              label="Apoderado"
              name="apoderado"
              value={formData.apoderado}
              onChange={handleChange}
              placeholder="Nombre del apoderado (si aplica)"
              style={{ gridColumn: 'span 2' }}
            />

            <TextareaField
              label="Observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Observaciones adicionales..."
              style={{ gridColumn: 'span 2' }}
            />
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                color: '#0052CC',
                border: '1px solid #0052CC',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Limpiar
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              Guardar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarPaciente;