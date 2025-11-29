import React from 'react';

const DetallesPaciente = ({ patient, onClose }) => {
  if (!patient) return null;

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
      maxWidth: '700px',
      width: '90%',
      maxHeight: '85vh',
      overflowY: 'auto',
      boxShadow: '0 4px 12px rgba(9, 30, 66, 0.25)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '2px solid #DFE1E6'
    },
    title: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#172B4D',
      margin: 0
    },
    closeBtn: {
      fontSize: '28px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      color: '#626F86',
      padding: '4px 8px'
    },
    section: {
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#0052CC',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '16px'
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    fieldLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#626F86',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    fieldValue: {
      fontSize: '14px',
      color: '#172B4D',
      padding: '8px 12px',
      backgroundColor: '#F5F7FA',
      borderRadius: '4px',
      border: '1px solid #DFE1E6'
    },
    signatureContainer: {
      border: '2px solid #DFE1E6',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#FAFBFC',
      textAlign: 'center'
    },
    signatureImage: {
      maxWidth: '100%',
      height: 'auto',
      border: '1px solid #DFE1E6',
      borderRadius: '4px',
      backgroundColor: 'white'
    },
    noSignature: {
      padding: '40px',
      color: '#626F86',
      fontStyle: 'italic',
      fontSize: '14px'
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: '16px',
      borderTop: '1px solid #DFE1E6'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#0052CC',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            👤 Detalles del Paciente
          </h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* Información Personal */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            📋 Información Personal
          </h3>
          <div style={styles.grid}>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>DNI</span>
              <span style={styles.fieldValue}>{patient.dni || patient.documentNumber || 'N/A'}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Nombre Completo</span>
              <span style={styles.fieldValue}>
                {patient.firstName && patient.lastName 
                  ? `${patient.firstName} ${patient.lastName}`
                  : patient.nombre || 'N/A'}
              </span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Fecha de Nacimiento</span>
              <span style={styles.fieldValue}>{formatDate(patient.dateBirth || patient.fechaNacimiento)}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Sexo</span>
              <span style={styles.fieldValue}>
                {patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Femenino' : patient.sexo || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            📞 Contacto
          </h3>
          <div style={styles.grid}>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Email</span>
              <span style={styles.fieldValue}>{patient.email || 'N/A'}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Teléfono</span>
              <span style={styles.fieldValue}>{patient.phone || patient.celular || 'N/A'}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Ciudad</span>
              <span style={styles.fieldValue}>{patient.city || patient.ciudad || 'N/A'}</span>
            </div>
            <div style={styles.field}>
              <span style={styles.fieldLabel}>Departamento</span>
              <span style={styles.fieldValue}>{patient.department || patient.departamento || 'N/A'}</span>
            </div>
          </div>
          <div style={styles.field}>
            <span style={styles.fieldLabel}>Dirección</span>
            <span style={styles.fieldValue}>{patient.address || patient.direccion || 'N/A'}</span>
          </div>
        </div>

        {/* Información Adicional */}
        {(patient.guardian || patient.apoderado || patient.assignedDoctor || patient.doctor || patient.agreement || patient.convenio) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              ℹ️ Información Adicional
            </h3>
            <div style={styles.grid}>
              {(patient.guardian || patient.apoderado) && (
                <div style={styles.field}>
                  <span style={styles.fieldLabel}>Apoderado</span>
                  <span style={styles.fieldValue}>{patient.guardian || patient.apoderado}</span>
                </div>
              )}
              {(patient.assignedDoctor || patient.doctor) && (
                <div style={styles.field}>
                  <span style={styles.fieldLabel}>Doctor Asignado</span>
                  <span style={styles.fieldValue}>{patient.assignedDoctor || patient.doctor}</span>
                </div>
              )}
              {(patient.agreement || patient.convenio) && (
                <div style={styles.field}>
                  <span style={styles.fieldLabel}>Convenio</span>
                  <span style={styles.fieldValue}>{patient.agreement || patient.convenio}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Observaciones */}
        {(patient.observations || patient.observaciones) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              📝 Observaciones
            </h3>
            <div style={styles.fieldValue}>
              {patient.observations || patient.observaciones}
            </div>
          </div>
        )}

        {/* Firma del Paciente */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            ✍️ Firma del Paciente
          </h3>
          <div style={styles.signatureContainer}>
            {patient.firmaDigital || patient.digitalSignature ? (
              <img
                src={patient.firmaDigital || patient.digitalSignature}
                alt="Firma del paciente"
                style={styles.signatureImage}
              />
            ) : (
              <div style={styles.noSignature}>
                Sin firma registrada
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button 
            style={styles.button}
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0747A6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0052CC'}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesPaciente;
