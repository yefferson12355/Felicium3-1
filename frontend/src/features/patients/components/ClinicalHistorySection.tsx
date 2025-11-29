import React from 'react';

const ClinicalHistorySection = ({ enfermedades, alergias, newEnfermedad, newAlergia, setNewEnfermedad, setNewAlergia, handleAgregarEnfermedad, handleAgregarAlergia }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '16px',
        fontWeight: 600,
        color: '#172B4D'
      }}>
        Antecedentes Clínicos
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 500, color: '#172B4D' }}>
            Enfermedades
          </h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Agregar enfermedad..."
              value={newEnfermedad}
              onChange={(e) => setNewEnfermedad(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                width: '200px'
              }}
            />
            <button
              onClick={handleAgregarEnfermedad}
              style={{
                padding: '4px 8px',
                backgroundColor: '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Agregar
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#F4F5F7',
          borderRadius: '3px',
          padding: '10px',
          minHeight: '40px'
        }}>
          {enfermedades.length > 0 ? (
            enfermedades.map((enf, index) => (
              <span key={enf.id} style={{
                display: 'inline-block',
                backgroundColor: '#DEEBFF',
                color: '#0052CC',
                padding: '4px 8px',
                borderRadius: '3px',
                marginRight: '8px',
                marginBottom: '8px',
                fontSize: '12px'
              }}>
                {enf.nombre}
              </span>
            ))
          ) : (
            <span style={{ color: '#6B778C', fontSize: '14px' }}>No se han registrado enfermedades</span>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 500, color: '#172B4D' }}>
            Alergias
          </h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Agregar alergia..."
              value={newAlergia}
              onChange={(e) => setNewAlergia(e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #DFE1E6',
                borderRadius: '3px',
                fontSize: '14px',
                width: '200px'
              }}
            />
            <button
              onClick={handleAgregarAlergia}
              style={{
                padding: '4px 8px',
                backgroundColor: '#0052CC',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Agregar
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#F4F5F7',
          borderRadius: '3px',
          padding: '10px',
          minHeight: '40px'
        }}>
          {alergias.length > 0 ? (
            alergias.map((aler, index) => (
              <span key={aler.id} style={{
                display: 'inline-block',
                backgroundColor: '#FFABBC',
                color: '#BF2642',
                padding: '4px 8px',
                borderRadius: '3px',
                marginRight: '8px',
                marginBottom: '8px',
                fontSize: '12px'
              }}>
                {aler.nombre}
              </span>
            ))
          ) : (
            <span style={{ color: '#6B778C', fontSize: '14px' }}>No se han registrado alergias</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalHistorySection;