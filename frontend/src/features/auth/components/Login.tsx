import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/contexts/AuthContext';
import { getRoleRoute } from '../../../core/utils/roleMapper';
import theme from '../../../core/styles/theme';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        const result = await login({ email, password });

        if (result.success && result.user) {
          console.log('Login successful with user:', result.user);
          
          // Usar roleMapper centralizado
          const roleRoute = getRoleRoute(result.user.role);
          console.log('Navigating to role route:', roleRoute);
          
          // Navegar usando hash (mantiene compatibilidad con HashRouter)
          window.location.hash = `#${roleRoute}`;
        } else {
          setErrors({ general: result.error || 'Credenciales inválidas' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: error.message || 'Error al iniciar sesión' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Page styles
  const pageContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing[5],
  };

  const loginBoxStyles = {
    width: '100%',
    maxWidth: '420px',
  };

  const logoContainerStyles = {
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  };

  const logoBoxStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borders.radius.lg,
    marginBottom: theme.spacing[4],
  };

  const logoTextStyles = {
    fontSize: theme.typography.fontSize['2xl'],
    color: 'white',
    fontWeight: theme.typography.fontWeight.bold,
    margin: 0,
  };

  const titleStyles = {
    margin: `0 0 ${theme.spacing[2]} 0`,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeight.tight,
  };

  const subtitleStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.normal,
  };

  const errorBoxStyles = {
    backgroundColor: theme.colors.error[50],
    border: `${theme.borders.width.thin} solid ${theme.colors.error[500]}`,
    borderRadius: theme.borders.radius.base,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    marginBottom: theme.spacing[5],
    color: theme.colors.error[700],
    fontSize: theme.typography.fontSize.sm,
  };

  const formStyles = {
    marginTop: theme.spacing[6],
  };

  const inputGroupStyles = {
    marginBottom: theme.spacing[5],
  };

  return (
    <div style={pageContainerStyles}>
      <div style={loginBoxStyles}>
        <div style={logoContainerStyles}>
          <div style={logoBoxStyles}>
            <span style={logoTextStyles}>CD</span>
          </div>
          <h1 style={titleStyles}>
            Clínica Dental Sonrisa Perfecta
          </h1>
          <p style={subtitleStyles}>
            Iniciar sesión en tu cuenta
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} style={formStyles}>
            {errors.general && (
              <div style={errorBoxStyles}>
                {errors.general}
              </div>
            )}

            <div style={inputGroupStyles}>
              <Input
                id="email"
                label="Usuario"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario"
                error={errors.email}
                fullWidth
              />
            </div>

            <div style={inputGroupStyles}>
              <Input
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password}
                fullWidth
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
            >
              {isLoading ? 'Verificando credenciales...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;