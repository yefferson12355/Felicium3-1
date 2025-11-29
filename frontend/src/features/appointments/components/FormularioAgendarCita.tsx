import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../../core/services/api/appointmentService';
import { patientService } from '../../../core/services/api/patientService';

/**
 * FormularioAgendarCita - Modal para agendar una nueva cita
 */
const FormularioAgendarCita = ({ mostrarModal, setMostrarModal, selectedDate, selectedHour, onSubmit }) => {
  const [formData, setFormData] = useState({
    paciente: '',
    dentista: '',
    razonConsulta: '',
    notas: ''
  });
  const [patients, setPatients] = useState([]);
  const [dentists, setDentists] = useState([
    { id: 'dentist-001', nombre: 'Dr. Carlos López' },
    { id: 'dentist-002', nombre: 'Dra. María García' },
    { id: 'dentist-003', nombre: 'Dr. Juan Martínez' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar pacientes
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await patientService.getAll();
        // Backend returns direct array: [{id, dni, nombre...}, ...]
        const data = response?.data || response;
        const pats = Array.isArray(data) ? data : (data?.patients || []);
        setPatients(Array.isArray(pats) ? pats : []);
      } catch (err) {
        console.error('Error cargando pacientes:', err);
      }
    };

    if (mostrarModal) {
      loadPatients();
    }
  }, [mostrarModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.paciente || !formData.dentista || !selectedDate || !selectedHour) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Backend expects timeSlot object, not fechaHora string
      const newAppointment = {
        patientId: formData.paciente,
        dentistId: formData.dentista,
        timeSlot: {
          date: selectedDate,
          startTime: selectedHour,
          endTime: `${parseInt(selectedHour.split(':')[0]) + 1}:00`
        },
        reason: formData.razonConsulta,
        treatmentType: formData.notas || 'Consulta general'
      };

      await appointmentService.create(newAppointment);
      
      // Resetear formulario
      setFormData({
        paciente: '',
        dentista: '',
        razonConsulta: '',
        notas: ''
      });

      onSubmit?.(newAppointment);
      setMostrarModal(false);
    } catch (err) {
      console.error('Error creando cita:', err);
      setError('Error al agendar la cita');
    } finally {
      setLoading(false);
    }
  };

  if (!mostrarModal) return null;

  const styles = {
    overlay: {
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
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 4px 12px rgba(9, 30, 66, 0.25)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#172b4d',
      margin: 0
    },
    closeBtn: {
      fontSize: '24px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      color: '#626f86'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    label: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#172b4d'
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #dfe1e6',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'inherit'
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #dfe1e6',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'inherit'
    },
    textarea: {
      padding: '8px 12px',
      border: '1px solid #dfe1e6',
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: 'inherit',
      minHeight: '80px',
      resize: 'vertical'
    },
    dateTimeDisplay: {
      padding: '8px 12px',
      backgroundColor: '#f5f7fa',
      borderRadius: '4px',
      fontSize: '13px',
      color: '#172b4d'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px'
    },
    submitBtn: {
      flex: 1,
      padding: '10px',
      backgroundColor: '#0052cc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    cancelBtn: {
      flex: 1,
      padding: '10px',
      backgroundColor: '#f5f7fa',
      color: '#172b4d',
      border: '1px solid #dfe1e6',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    errorMsg: {
      backgroundColor: '#ffeceb',
      color: '#ae2a19',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '13px'
    }
  };

  return (
    <div style={styles.overlay} onClick={() => !loading && setMostrarModal(false)}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>📅 Agendar Nueva Cita</h2>
          <button style={styles.closeBtn} onClick={() => setMostrarModal(false)}>×</button>
        </div>

        {error && <div style={styles.errorMsg}>⚠️ {error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Fecha y Hora */}
          <div style={styles.formGroup}>
            <label style={styles.label}>📅 Fecha y Hora</label>
            <div style={styles.dateTimeDisplay}>
              {selectedDate && selectedHour 
                ? `${selectedDate} a las ${selectedHour}`
                : 'Selecciona fecha y hora en el calendario'
              }
            </div>
          </div>

          {/* Paciente */}
          <div style={styles.formGroup}>
            <label style={styles.label}>👤 Paciente *</label>
            <select
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">-- Selecciona un paciente --</option>
              {patients.map(pat => (
                <option key={pat.id || pat.nombre} value={pat.id || pat.nombre}>
                  {pat.firstName && pat.lastName 
                    ? `${pat.firstName} ${pat.lastName}`
                    : pat.nombre || pat.name || 'N/A'}
                </option>
              ))}
            </select>
          </div>

          {/* Dentista */}
          <div style={styles.formGroup}>
            <label style={styles.label}>👨‍⚕️ Dentista *</label>
            <select
              name="dentista"
              value={formData.dentista}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">-- Selecciona un dentista --</option>
              {dentists.map(dent => (
                <option key={dent.id} value={dent.id}>
                  {dent.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Razón Consulta */}
          <div style={styles.formGroup}>
            <label style={styles.label}>📝 Razón de la Consulta</label>
            <input
              type="text"
              name="razonConsulta"
              value={formData.razonConsulta}
              onChange={handleChange}
              placeholder="Ej: Limpieza dental, Extracción, etc."
              style={styles.input}
            />
          </div>

          {/* Notas */}
          <div style={styles.formGroup}>
            <label style={styles.label}>📋 Notas Adicionales</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Información adicional sobre la cita..."
              style={styles.textarea}
            />
          </div>

          {/* Botones */}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={() => setMostrarModal(false)}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{...styles.submitBtn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
              disabled={loading}
            >
              {loading ? '⏳ Agendando...' : '✓ Agendar Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAgendarCita;
