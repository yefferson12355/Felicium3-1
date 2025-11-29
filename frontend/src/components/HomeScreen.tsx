import React from 'react';

const HomeScreen = () => {
  const handleRoleSelect = (role) => {
    // Cambiar la URL a la ruta con hash correspondiente
    window.location.hash = `#${role}`;
  };

  const roles = [
    { name: 'Login', route: 'login', description: 'Pantalla de inicio de sesión', emoji: '🔐' },
    { name: 'Paciente', route: 'paciente', description: 'Panel del paciente', emoji: '🩺' },
    { name: 'Recepcionista', route: 'recepcionista', description: 'Panel de recepcionista', emoji: '📋' },
    { name: 'Doctor', route: 'doctor', description: 'Panel del doctor', emoji: '👨‍⚕️' },
    { name: 'Admin', route: 'admin', description: 'Panel de administración', emoji: '⚙️' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#F4F5F7',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 600,
          color: '#172B4D',
          marginBottom: '16px'
        }}>
          Clínica Dental Sonrisa Perfecta
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6B778C',
          margin: 0
        }}>
          Seleccione su rol para continuar
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => handleRoleSelect(role.route)}
            style={{
              textDecoration: 'none',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
              transition: 'box-shadow 0.1s ease, transform 0.1s ease',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(9, 30, 66, 0.15), 0 0 1px rgba(9, 30, 66, 0.31)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                {role.emoji}
              </div>

              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#172B4D',
                margin: '0 0 8px 0'
              }}>
                {role.name}
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#6B778C',
                margin: 0
              }}>
                {role.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#6B778C',
        fontSize: '14px'
      }}>
        SISTEMA DE GESTIÓN CLÍNICA DENTAL
      </div>
    </div>
  );
};

export default HomeScreen;