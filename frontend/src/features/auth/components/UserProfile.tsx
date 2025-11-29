import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../core/contexts/AuthContext';
import { getRoleLabel } from '../../../core/utils/roleMapper';
import theme from '../../../core/styles/theme';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';

const UserProfile = ({ role = 'paciente', userName = 'Usuario' }) => {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    dni: '',
    rol: role
  });

  // Cargar datos del usuario desde el contexto
  useEffect(() => {
    if (user) {
      setUserData({
        nombre: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario',
        email: user.email || '',
        telefono: user.phone || user.telefono || '',
        direccion: user.address || user.direccion || '',
        fechaNacimiento: user.birthDate || user.fechaNacimiento || '',
        dni: user.dni || user.documentId || '',
        rol: role
      });
    }
  }, [user, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const profileData = {
        firstName: userData.nombre.split(' ')[0],
        lastName: userData.nombre.split(' ').slice(1).join(' '),
        email: userData.email,
        phone: userData.telefono,
        address: userData.direccion,
        birthDate: userData.fechaNacimiento,
        dni: userData.dni,
      };

      const result = await updateUserProfile(profileData);
      
      if (result.success) {
        setIsEditing(false);
        alert('✅ Perfil actualizado correctamente');
      } else {
        alert('❌ Error: ' + (result.error || 'No se pudo actualizar el perfil'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Recargar datos originales
    if (user) {
      setUserData({
        nombre: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario',
        email: user.email || '',
        telefono: user.phone || user.telefono || '',
        direccion: user.address || user.direccion || '',
        fechaNacimiento: user.birthDate || user.fechaNacimiento || '',
        dni: user.dni || user.documentId || '',
        rol: role
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    // Usar logout del contexto para limpiar estado
    logout();
    window.location.hash = '#';
  };

  // Styles
  const containerStyles = {
    padding: theme.spacing[6],
    maxWidth: '640px',
    margin: `${theme.spacing[5]} auto`,
  };

  const titleStyles = {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[6],
    borderBottom: `${theme.borders.width.medium} solid ${theme.colors.primary[500]}`,
    paddingBottom: theme.spacing[2],
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const avatarSectionStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing[6],
  };

  const avatarStyles = {
    width: '64px',
    height: '64px',
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutral[700],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: theme.spacing[4],
  };

  const userInfoStyles = {
    flex: 1,
  };

  const userNameStyles = {
    margin: 0,
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const roleTextStyles = {
    margin: `${theme.spacing[1]} 0 0 0`,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
  };

  const fieldStyles = {
    marginBottom: theme.spacing[5],
  };

  const readOnlyValueStyles = {
    padding: theme.spacing[2],
    backgroundColor: theme.colors.background.subtle,
    border: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    borderRadius: theme.borders.radius.base,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[6],
  };

  if (!user) {
    return (
      <div style={containerStyles}>
        <Loader text="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <h2 style={titleStyles}>Mi Perfil</h2>

      <Card padding="lg">
        <div style={avatarSectionStyles}>
          <div style={avatarStyles}>
            {userData.nombre.charAt(0).toUpperCase()}
          </div>
          <div style={userInfoStyles}>
            <h3 style={userNameStyles}>{userData.nombre || 'Usuario'}</h3>
            <p style={roleTextStyles}>{getRoleLabel(userData.rol)}</p>
          </div>
        </div>

        <form>
          <div style={fieldStyles}>
            {isEditing ? (
              <Input
                label="Nombre Completo"
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <>
                <label style={{
                  display: 'block',
                  marginBottom: theme.spacing[1],
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                }}>
                  Nombre Completo
                </label>
                <div style={readOnlyValueStyles}>{userData.nombre}</div>
              </>
            )}
          </div>

          <div style={fieldStyles}>
            {isEditing ? (
              <Input
                label="Email"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <>
                <label style={{
                  display: 'block',
                  marginBottom: theme.spacing[1],
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                }}>
                  Email
                </label>
                <div style={readOnlyValueStyles}>{userData.email}</div>
              </>
            )}
          </div>

          <div style={fieldStyles}>
            {isEditing ? (
              <Input
                label="Teléfono"
                type="tel"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <>
                <label style={{
                  display: 'block',
                  marginBottom: theme.spacing[1],
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                }}>
                  Teléfono
                </label>
                <div style={readOnlyValueStyles}>{userData.telefono}</div>
              </>
            )}
          </div>

          <div style={fieldStyles}>
            {isEditing ? (
              <Input
                label="Dirección"
                type="text"
                name="direccion"
                value={userData.direccion}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <>
                <label style={{
                  display: 'block',
                  marginBottom: theme.spacing[1],
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                }}>
                  Dirección
                </label>
                <div style={readOnlyValueStyles}>{userData.direccion}</div>
              </>
            )}
          </div>

          <div style={fieldStyles}>
            {isEditing ? (
              <Input
                label="Fecha de Nacimiento"
                type="date"
                name="fechaNacimiento"
                value={userData.fechaNacimiento}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <>
                <label style={{
                  display: 'block',
                  marginBottom: theme.spacing[1],
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.sm,
                }}>
                  Fecha de Nacimiento
                </label>
                <div style={readOnlyValueStyles}>
                  {new Date(userData.fechaNacimiento).toLocaleDateString()}
                </div>
              </>
            )}
          </div>

          {role === 'paciente' && (
            <div style={fieldStyles}>
              {isEditing ? (
                <Input
                  label="DNI"
                  type="text"
                  name="dni"
                  value={userData.dni}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
                <>
                  <label style={{
                    display: 'block',
                    marginBottom: theme.spacing[1],
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                  }}>
                    DNI
                  </label>
                  <div style={readOnlyValueStyles}>{userData.dni}</div>
                </>
              )}
            </div>
          )}

          <div style={buttonGroupStyles}>
            {isEditing ? (
              <>
                <Button
                  type="button"
                  onClick={handleSave}
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="secondary"
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleEdit}
                variant="primary"
              >
                Editar Perfil
              </Button>
            )}
            
            <Button
              type="button"
              onClick={handleLogout}
              variant="danger"
              style={{ marginLeft: 'auto' }}
            >
              Cerrar sesión
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;