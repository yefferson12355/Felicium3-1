import React, { useState } from 'react';

const ArchivosClinicos = ({ pacienteId }) => {
  const [archivos, setArchivos] = useState([
    { id: 1, nombre: 'radiografia_panoramica.pdf', tipo: 'Radiografía', descripcion: 'Radiografía panorámica del 15/10/2025', fecha: '2025-10-15' },
    { id: 2, nombre: 'fotos_control.jpg', tipo: 'Fotografía', descripcion: 'Fotos de control antes del tratamiento', fecha: '2025-10-20' },
    { id: 3, nombre: 'prescripcion_octubre.pdf', tipo: 'Prescripción', descripcion: 'Medicamentos recetados en octubre', fecha: '2025-10-25' }
  ]);
  
  const [archivoSubir, setArchivoSubir] = useState(null);
  const [tipoArchivo, setTipoArchivo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombrePersonalizado, setNombrePersonalizado] = useState('');
  const [opcionesTipo, setOpcionesTipo] = useState(['Radiografía', 'Fotografía', 'Prescripción', 'Laboratorio', 'Otros']);
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [mostrarModalSubida, setMostrarModalSubida] = useState(false);

  const tiposPredeterminados = ['Radiografía', 'Fotografía', 'Prescripción', 'Laboratorio', 'Otros'];

  const manejarSubida = (e) => {
    e.preventDefault();
    
    if (archivoSubir) {
      const nuevoArchivo = {
        id: archivos.length + 1,
        nombre: nombrePersonalizado || archivoSubir.name,
        tipo: tipoArchivo || 'Otros',
        descripcion: descripcion,
        fecha: new Date().toISOString().split('T')[0]
      };
      
      setArchivos([...archivos, nuevoArchivo]);
      setArchivoSubir(null);
      setTipoArchivo('');
      setDescripcion('');
      setNombrePersonalizado('');
      setMostrarModalSubida(false);
    }
  };

  const eliminarArchivo = (id) => {
    setArchivos(archivos.filter(archivo => archivo.id !== id));
  };

  const verArchivo = (archivo) => {
    // En una aplicación real, esto abriría el archivo para visualización
    alert(`Visualizando archivo: ${archivo.nombre}`);
  };

  const editarArchivo = (archivo) => {
    // En una aplicación real, esto abriría un formulario para editar el archivo
    alert(`Editando archivo: ${archivo.nombre}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 600, 
        color: '#172B4D', 
        marginBottom: '20px' 
      }}>
        Archivos Clínicos
      </h2>
      
      <div style={{ 
        border: '2px dashed #0052CC', 
        borderRadius: '8px', 
        padding: '40px', 
        textAlign: 'center', 
        marginBottom: '20px',
        backgroundColor: '#F4F5F7'
      }}>
        <div style={{ fontSize: '48px', color: '#0052CC', marginBottom: '16px' }}>📁</div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 500, 
          color: '#172B4D', 
          marginBottom: '8px' 
        }}>
          Arrastre y suelte archivos aquí o haga clic para seleccionar
        </h3>
        <p style={{ color: '#6B778C', marginBottom: '16px' }}>
          Tipos soportados: PDF, JPG, PNG, DOC, XLS
        </p>
        <button
          onClick={() => setMostrarModalSubida(true)}
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
          Seleccionar Archivo
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
        padding: '20px'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#172B4D', 
          marginBottom: '16px' 
        }}>
          Archivos Existentes
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {archivos.map(archivo => (
            <div key={archivo.id} style={{
              border: '1px solid #DFE1E6',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 500, 
                  color: '#172B4D', 
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📄</span>
                  {archivo.nombre}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#6B778C', 
                  marginBottom: '4px' 
                }}>
                  <strong>Tipo:</strong> {archivo.tipo}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6B778C', 
                  marginBottom: '4px' 
                }}>
                  <strong>Descripción:</strong> {archivo.descripcion}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6B778C' 
                }}>
                  <strong>Fecha:</strong> {archivo.fecha}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => verArchivo(archivo)}
                  style={{
                    padding: '6px 12px',
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
                  onClick={() => editarArchivo(archivo)}
                  style={{
                    padding: '6px 12px',
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
                  onClick={() => eliminarArchivo(archivo.id)}
                  style={{
                    padding: '6px 12px',
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal de subida de archivos */}
      {mostrarModalSubida && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: '#172B4D'
              }}>
                Subir Nuevo Archivo
              </h3>
              <button
                onClick={() => setMostrarModalSubida(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6B778C'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={manejarSubida}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#172B4D', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>Seleccionar Archivo</label>
                <input
                  type="file"
                  onChange={(e) => setArchivoSubir(e.target.files[0])}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #DFE1E6',
                    borderRadius: '3px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#172B4D', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>Nombre Personalizado (Opcional)</label>
                <input
                  type="text"
                  placeholder="Nombre para el archivo..."
                  value={nombrePersonalizado}
                  onChange={(e) => setNombrePersonalizado(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #DFE1E6',
                    borderRadius: '3px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#172B4D', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>Tipo de Archivo</label>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <select
                    value={tipoArchivo}
                    onChange={(e) => {
                      if (e.target.value === 'otros_personalizado') {
                        setTipoArchivo(nuevoTipo);
                      } else {
                        setTipoArchivo(e.target.value);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #DFE1E6',
                      borderRadius: '3px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Seleccionar tipo</option>
                    {tiposPredeterminados.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                    <option value="otros_personalizado">Otro (especificar)</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Nuevo tipo..."
                    value={tipoArchivo === 'otros_personalizado' ? nuevoTipo : ''}
                    onChange={(e) => {
                      setNuevoTipo(e.target.value);
                      setTipoArchivo(e.target.value);
                    }}
                    disabled={tipoArchivo !== 'otros_personalizado'}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #DFE1E6',
                      borderRadius: '3px',
                      fontSize: '14px',
                      background: tipoArchivo === 'otros_personalizado' ? 'white' : '#F4F5F7'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#172B4D', 
                  fontSize: '14px', 
                  fontWeight: 500 
                }}>Descripción</label>
                <textarea
                  placeholder="Descripción del archivo..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #DFE1E6',
                    borderRadius: '3px',
                    fontSize: '14px',
                    minHeight: '80px'
                  }}
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setMostrarModalSubida(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#0052CC',
                    border: '1px solid #0052CC',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginRight: '8px'
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
                    fontSize: '14px'
                  }}
                >
                  Subir Archivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivosClinicos;