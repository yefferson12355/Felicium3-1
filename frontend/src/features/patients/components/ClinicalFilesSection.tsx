import React from 'react';

const ClinicalFilesSection = ({ 
  archivos, 
  archivosParaSubir, 
  tipoArchivo, 
  descripcionArchivo, 
  tiposArchivo, 
  archivoSeleccionado, 
  setTipoArchivo, 
  setDescripcionArchivo,
  handleFileChange, 
  handleDragOver, 
  handleDrop, 
  handleSubirArchivo, 
  setArchivos 
}) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '16px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Archivos Clínicos
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 500, color: '#172B4D' }}>
          Subir Archivos
        </h4>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #DFE1E6',
            borderRadius: '3px',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#FAFBFC',
            marginBottom: '10px'
          }}
        >
          <p style={{ margin: '0 0 10px 0', color: '#6B778C' }}>
            Arrastre y suelte archivos aquí o haga clic para seleccionar
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#0052CC',
              color: 'white',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Seleccionar Archivo
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '10px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Tipo de Archivo
            </label>
            <select
              value={tipoArchivo}
              onChange={(e) => setTipoArchivo(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px'
              }}
            >
              <option value="">Seleccionar tipo</option>
              {tiposArchivo.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
              <option value="otro">Otro (escribir)</option>
            </select>
            {tipoArchivo === 'otro' ? (
              <input
                type="text"
                placeholder="Escriba el tipo de archivo"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #DFE1E6',
                  borderRadius: '3px',
                  fontSize: '14px',
                  marginTop: '8px'
                }}
              />
            ) : null}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              fontWeight: '500',
              color: '#172B4D'
            }}>
              Descripcion
            </label>
            <input
              type="text"
              placeholder="Descripcion del archivo"
              value={descripcionArchivo}
              onChange={(e) => setDescripcionArchivo(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSubirArchivo}
          disabled={!archivosParaSubir.length || !tipoArchivo || !descripcionArchivo}
          style={{
            padding: '8px 16px',
            backgroundColor: !archivosParaSubir.length || !tipoArchivo || !descripcionArchivo ? '#ccc' : '#0052CC',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: !archivosParaSubir.length || !tipoArchivo || !descripcionArchivo ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            marginTop: '10px'
          }}
        >
          Subir Archivos
        </button>
      </div>

      <div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 500, color: '#172B4D' }}>
          Archivos Existentes
        </h4>
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
                  Tipo
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Descripcion
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#172B4D'
                }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {archivos.map((archivo) => (
                <tr key={archivo.id} style={{
                  borderBottom: '1px solid #DFE1E6'
                }}>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {archivo.nombre}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {archivo.tipo}
                  </td>
                  <td style={{
                    padding: '12px',
                    color: '#172B4D'
                  }}>
                    {archivo.descripcion}
                  </td>
                  <td style={{
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => alert(`Viendo archivo: ${archivo.nombre}`)}
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
                        Ver
                      </button>
                      <button
                        onClick={() => {
                          // Lógica para editar archivo
                        }}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#FFAB00',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('¿Eliminar este archivo?')) {
                            setArchivos(archivos.filter(a => a.id !== archivo.id));
                          }
                        }}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#FF5630',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClinicalFilesSection;