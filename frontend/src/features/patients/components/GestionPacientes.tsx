import React, { useEffect, useState } from 'react';
import { patientService } from '../../../core/services/api/patientService';
import FormularioAgregarPaciente from './FormularioAgregarPaciente';
import DetallesPaciente from './DetallesPaciente';

const GestionPacientes = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getAll();
      // Backend returns direct array: [{id, dni, nombre...}, ...]
      const pats = Array.isArray(response) ? response : (response?.patients || []);
      setPatients(Array.isArray(pats) ? pats : []);
      setError(null);
    } catch (err) {
      console.error('Error cargando pacientes:', err);
      setError('Error al cargar pacientes');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = patients.filter(pat => {
    if (!pat) return false;
    const searchLower = (searchTerm || '').toLowerCase();
    const nombre = (pat.firstName || pat.nombre || '').toLowerCase();
    const apellido = (pat.lastName || pat.apellido || '').toLowerCase();
    const email = (pat.email || '').toLowerCase();
    const phone = (pat.phone || pat.celular || '').toString();
    
    return nombre.includes(searchLower) || 
           apellido.includes(searchLower) || 
           email.includes(searchLower) || 
           phone.includes(searchLower);
  });

  const handleAddPatient = async (formData) => {
    try {
      console.log('📝 Enviando datos de paciente:', formData);
      
      await patientService.createPatient({
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.celular,
        direccion: formData.direccion,
        nombreApoderado: formData.apoderado,
        firmaDigital: formData.firmaDigital || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      });
      
      await loadPatients();
      setMostrarFormulario(false);
      alert('✅ Paciente creado exitosamente');
    } catch (err) {
      console.error('❌ Error creando paciente:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Error al crear paciente';
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            style={{ padding: '8px 12px', backgroundColor: '#626F86', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} 
            onClick={() => window.location.hash = '#recepcionista'}
          >
            ← Volver al Panel
          </button>
          <h2 style={{ margin: 0 }}>Gestión de Pacientes</h2>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={{ padding: '8px 16px', backgroundColor: '#00875A', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} 
            onClick={loadPatients}
            disabled={loading}
          >
            🔄 Actualizar
          </button>
          <button 
            style={{ padding: '8px 16px', backgroundColor: '#0052CC', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }} 
            onClick={() => setMostrarFormulario(true)}
          >
            + Nuevo Paciente
          </button>
        </div>
      </div>

      {error && <div style={{ color: '#ae2a19', backgroundColor: '#ffeceb', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>{error}</div>}

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #dfe1e6', borderRadius: '3px', width: '100%', maxWidth: '400px' }}
        />
      </div>

      {filteredPatients.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f7fa', borderBottom: '2px solid #dfe1e6' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Nombre</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Teléfono</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((pat, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #dfe1e6' }}>
                <td style={{ padding: '12px' }}>{pat.firstName || pat.nombre || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{pat.email || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{pat.phone || pat.celular || 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  <button 
                    style={{ padding: '4px 8px', backgroundColor: '#0052cc', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                    onClick={() => setSelectedPatient(pat)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#626f86' }}>No hay pacientes</div>
      )}

      {mostrarFormulario && (
        <FormularioAgregarPaciente
          onClose={() => setMostrarFormulario(false)}
          onAddPatient={handleAddPatient}
        />
      )}

      {selectedPatient && (
        <DetallesPaciente
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default GestionPacientes;
