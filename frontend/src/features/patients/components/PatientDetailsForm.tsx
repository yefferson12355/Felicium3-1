import React from 'react';

const PatientDetailsForm = ({ patient, editedPatient, isEditing, handleInputChange, handleSave, handleCancel, setIsEditing }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <form>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Nombre
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="nombre"
                  value={editedPatient.nombre}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.nombre
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Apellido
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="apellido"
                  value={editedPatient.apellido}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.apellido
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              DNI
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="dni"
                  value={editedPatient.dni}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.dni
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Fecha de Nacimiento
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={editedPatient.fechaNacimiento || '1980-01-01'}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                '1980-01-01'
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Sexo
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <select
                  name="sexo"
                  value={editedPatient.sexo}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              ) : (
                editedPatient.sexo === 'M' ? 'Masculino' : editedPatient.sexo === 'F' ? 'Femenino' : 'Otro'
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Nro. Celular
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="telefono"
                  value={editedPatient.telefono}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.telefono
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Email
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedPatient.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.email
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Doctor
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="doctor"
                  value={editedPatient.doctor}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.doctor
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Dirección
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="direccion"
                  value={editedPatient.direccion}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.direccion
              )}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Convenio
            </label>
            <div style={{
              padding: '8px',
              backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
              border: '1px solid #DFE1E6',
              borderRadius: '3px',
              fontSize: '14px',
              color: '#172B4D'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  name="convenio"
                  value={editedPatient.convenio}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: 'none',
                    fontSize: '14px'
                  }}
                />
              ) : (
                editedPatient.convenio
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '4px',
            fontWeight: '500',
            color: '#172B4D'
          }}>
            Observaciones
          </label>
          <div style={{
            padding: '8px',
            backgroundColor: isEditing ? '#FAFBFC' : '#F4F5F7',
            border: '1px solid #DFE1E6',
            borderRadius: '3px',
            fontSize: '14px',
            color: '#172B4D'
          }}>
            {isEditing ? (
              <textarea
                name="observaciones"
                value={editedPatient.observaciones}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '4px',
                  border: 'none',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            ) : (
              editedPatient.observaciones || 'Ninguna'
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          {isEditing ? (
            <React.Fragment>
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
                  fontSize: '14px'
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Guardar Cambios
              </button>
            </React.Fragment>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Editar Datos
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientDetailsForm;