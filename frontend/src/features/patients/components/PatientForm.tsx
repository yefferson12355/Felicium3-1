import React from 'react';
import TextInput from './form/TextInput';
import SelectInput from './form/SelectInput';
import TextareaInput from './form/TextareaInput';
import SignatureCanvas from '../../../components/shared/SignatureCanvas';

const PatientForm = ({
  formData,
  handleInputChange,
  handleSignatureChange,
  requiredFields = []
}) => {
  const isFieldRequired = (fieldName) => requiredFields.includes(fieldName);

  const sexOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'O', label: 'Otro' }
  ];

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <TextInput
          label="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleInputChange}
          placeholder="Ingrese DNI"
          required={isFieldRequired('dni')}
        />

        <TextInput
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Ingrese nombre"
          required={isFieldRequired('nombre')}
        />

        <TextInput
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
          placeholder="Ingrese apellido"
          required={isFieldRequired('apellido')}
        />

        <TextInput
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleInputChange}
          placeholder="Ingrese fecha de nacimiento"
          type="date"
          required={isFieldRequired('fechaNacimiento')}
        />

        <TextInput
          label="Celular"
          name="celular"
          value={formData.celular}
          onChange={handleInputChange}
          placeholder="Ingrese celular"
          required={isFieldRequired('celular')}
        />

        <TextInput
          label="Ciudad"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleInputChange}
          placeholder="Ingrese ciudad"
          required={isFieldRequired('ciudad')}
        />

        <TextInput
          label="Apoderado"
          name="apoderado"
          value={formData.apoderado}
          onChange={handleInputChange}
          placeholder="Ingrese apoderado"
        />

        <TextInput
          label="Departamento"
          name="departamento"
          value={formData.departamento}
          onChange={handleInputChange}
          placeholder="Ingrese departamento"
          required={isFieldRequired('departamento')}
        />

        <TextInput
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleInputChange}
          placeholder="Ingrese dirección"
          required={isFieldRequired('direccion')}
        />

        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Ingrese email"
          type="email"
          required={isFieldRequired('email')}
        />

        <SelectInput
          label="Sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleInputChange}
          options={sexOptions}
          required={isFieldRequired('sexo')}
        />

        <TextInput
          label="Convenio"
          name="convenio"
          value={formData.convenio}
          onChange={handleInputChange}
          placeholder="Ingrese convenio"
        />

        <TextInput
          label="Doctor a cargo"
          name="doctor"
          value={formData.doctor}
          onChange={handleInputChange}
          placeholder="Ingrese doctor a cargo"
        />
      </div>

      <TextareaInput
        label="Observaciones"
        name="observaciones"
        value={formData.observaciones}
        onChange={handleInputChange}
        placeholder="Ingrese observaciones"
      />

      <SignatureCanvas
        label="Firma del Paciente"
        required={isFieldRequired('firmaDigital')}
        onSignatureChange={handleSignatureChange}
      />
    </>
  );
};

export default PatientForm;