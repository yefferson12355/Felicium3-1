# Módulo de Auth (Autenticación)

## Descripción

El módulo de **Auth** maneja toda la funcionalidad relacionada con autenticación, autorización y gestión de usuarios en el sistema Felicium. Implementa una arquitectura modular completa con servicios, hooks, utilidades y tipos bien definidos.

## Estructura del Módulo

```
auth/
├── components/          # Componentes React de autenticación
├── hooks/              # Custom hooks para lógica reutilizable
│   ├── useAuth.js
│   ├── useAuthForm.js
│   ├── usePermissions.js
│   └── index.js
├── services/           # Servicios de API
│   ├── authService.js
│   └── index.js
├── types/              # Constantes y tipos
│   ├── authTypes.js
│   ├── roleConfig.js
│   └── index.js
└── utils/              # Funciones auxiliares
    ├── validationUtils.js
    ├── permissionUtils.js
    ├── errorUtils.js
    └── index.js
```

---

## 📦 Servicios

### `authService`

Servicio centralizado para todas las operaciones de autenticación.

**Importación:**
```javascript
import { authService } from '../modules/auth/services';
```

**Métodos disponibles:**

#### Autenticación
- `login(credentials)` - Iniciar sesión
- `register(userData)` - Registrar nuevo usuario
- `logout()` - Cerrar sesión
- `refreshToken()` - Refrescar token de autenticación

#### Gestión de Perfil
- `getProfile()` - Obtener perfil del usuario
- `updateProfile(profileData)` - Actualizar perfil
- `changePassword(passwordData)` - Cambiar contraseña

#### Recuperación de Contraseña
- `forgotPassword(email)` - Solicitar recuperación
- `resetPassword(resetData)` - Restablecer contraseña

#### Verificación
- `verifyEmail(token)` - Verificar email
- `resendVerificationEmail()` - Reenviar email de verificación

#### Utilidades localStorage
- `isAuthenticated()` - Verificar si está autenticado
- `getToken()` - Obtener token
- `setToken(token)` - Guardar token
- `getUser()` - Obtener usuario
- `setUser(user)` - Guardar usuario
- `getUserRole()` - Obtener rol del usuario
- `hasRole(role)` - Verificar rol específico
- `hasAnyRole(roles)` - Verificar si tiene alguno de los roles

**Ejemplo de uso:**
```javascript
// Login
const result = await authService.login({
  email: 'usuario@example.com',
  password: 'password123'
});

if (result.success) {
  console.log('Usuario autenticado:', result.user);
}

// Verificar autenticación
if (authService.isAuthenticated()) {
  const user = authService.getUser();
  const role = authService.getUserRole();
}
```

---

## 🎣 Custom Hooks

### `useAuth`

Hook principal para gestión de autenticación.

**Uso:**
```javascript
import { useAuth } from '../modules/auth/hooks';

const {
  user,              // Usuario actual
  isAuthenticated,   // Estado de autenticación
  loading,           // Estado de carga
  error,             // Errores
  
  // Autenticación
  login,
  register,
  logout,
  
  // Perfil
  updateProfile,
  changePassword,
  
  // Recuperación
  forgotPassword,
  resetPassword,
  
  // Verificación
  verifyEmail,
  refreshToken,
  
  // Roles
  hasRole,
  hasAnyRole,
  getUserRole,
} = useAuth();
```

**Ejemplo:**
```javascript
function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      // Redirigir al dashboard
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
```

### `useAuthForm`

Hook para manejo de formularios de autenticación.

**Uso:**
```javascript
import { useAuthForm } from '../modules/auth/hooks';
import { validateLoginForm } from '../modules/auth/utils';

const {
  formData,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
} = useAuthForm(initialData, validateLoginForm, onSubmit);
```

**Ejemplo:**
```javascript
function LoginForm() {
  const { login } = useAuth();
  
  const form = useAuthForm(
    { email: '', password: '' },
    validateLoginForm,
    async (data) => await login(data)
  );

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        name="email"
        value={form.formData.email}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      {form.touched.email && form.errors.email && (
        <span>{form.errors.email}</span>
      )}
      
      <button type="submit" disabled={!form.isValid || form.isSubmitting}>
        Iniciar Sesión
      </button>
    </form>
  );
}
```

### `usePermissions`

Hook para verificación de permisos.

**Uso:**
```javascript
import { usePermissions } from '../modules/auth/hooks';

const {
  can,        // Verificar permiso
  canAll,     // Verificar todos los permisos
  canAny,     // Verificar algún permiso
  cannot,     // Verificar que NO tiene permiso
  userRole,   // Rol del usuario
} = usePermissions();
```

**Ejemplo:**
```javascript
function AdminPanel() {
  const { can, userRole } = usePermissions();

  if (!can('manage_users')) {
    return <div>No tienes permiso para acceder</div>;
  }

  return <div>Panel de administración</div>;
}
```

---

## 📋 Types y Constantes

### Roles de Usuario
```javascript
import { USER_ROLES } from '../modules/auth/types';

USER_ROLES.ADMIN          // 'admin'
USER_ROLES.DENTIST        // 'dentista'
USER_ROLES.RECEPTIONIST   // 'recepcionista'
USER_ROLES.PATIENT        // 'paciente'
```

### Configuración de Roles
```javascript
import { getRoleLabel, getRoleColor, getRoleIcon } from '../modules/auth/types';

const label = getRoleLabel('admin');  // 'Administrador'
const color = getRoleColor('admin');  // '#9C27B0'
const icon = getRoleIcon('admin');    // '👑'
```

### Permisos
```javascript
import { ROLE_PERMISSIONS } from '../modules/auth/types';

// Permisos del admin
ROLE_PERMISSIONS[USER_ROLES.ADMIN]
// ['manage_users', 'manage_appointments', 'manage_patients', ...]
```

### Errores de Autenticación
```javascript
import { AUTH_ERRORS, AUTH_ERROR_MESSAGES } from '../modules/auth/types';

const errorMsg = AUTH_ERROR_MESSAGES[AUTH_ERRORS.INVALID_CREDENTIALS];
// 'Email o contraseña incorrectos'
```

---

## 🛠️ Utilidades

### Validation Utils
```javascript
import {
  validateEmail,
  validatePassword,
  validateLoginForm,
  validateRegisterForm,
  getPasswordStrength,
} from '../modules/auth/utils';

// Validar email
const { valid, error } = validateEmail('user@example.com');

// Validar contraseña
const { valid, errors } = validatePassword('MyPass123!');

// Validar formulario de login
const validation = validateLoginForm({ email, password });

// Obtener fortaleza de contraseña
const { strength, score, feedback } = getPasswordStrength('MyPass123!');
// { strength: 'strong', score: 6, feedback: 'Contraseña fuerte' }
```

### Permission Utils
```javascript
import { hasPermission, getRolePermissions } from '../modules/auth/utils';

const canManageUsers = hasPermission('admin', 'manage_users'); // true
const permissions = getRolePermissions('dentista');
// ['view_appointments', 'manage_own_appointments', ...]
```

### Error Utils
```javascript
import { parseAuthError, getErrorMessage } from '../modules/auth/utils';

try {
  await authService.login(credentials);
} catch (error) {
  const { type, message } = parseAuthError(error);
  console.log(message); // Mensaje amigable en español
}
```

---

## 🎯 Patrones de Uso

### Patrón 1: Login Completo
```javascript
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (formData) => {
    const result = await login(formData);
    if (result.success) {
      const role = result.user.role;
      navigate(`/${role}/dashboard`);
    }
  };

  const form = useAuthForm(
    { email: '', password: '', rememberMe: false },
    validateLoginForm,
    handleSubmit
  );

  return <LoginForm {...form} />;
}
```

### Patrón 2: Protección de Rutas
```javascript
function ProtectedRoute({ children, requiredPermission }) {
  const { isAuthenticated } = useAuth();
  const { can } = usePermissions();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredPermission && !can(requiredPermission)) {
    return <div>Acceso denegado</div>;
  }

  return children;
}
```

### Patrón 3: Renderizado Condicional por Rol
```javascript
function Dashboard() {
  const { user } = useAuth();
  const { can } = usePermissions();

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      
      {can('manage_users') && (
        <AdminPanel />
      )}
      
      {can('manage_appointments') && (
        <AppointmentsPanel />
      )}
    </div>
  );
}
```

### Patrón 4: Cambio de Contraseña
```javascript
function ChangePasswordForm() {
  const { changePassword } = useAuth();
  
  const handleSubmit = async (formData) => {
    const result = await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    
    if (result.success) {
      alert('Contraseña cambiada exitosamente');
    }
  };

  const form = useAuthForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    validateChangePasswordForm,
    handleSubmit
  );

  return <PasswordForm {...form} />;
}
```

---

## 📝 Requisitos de Contraseña

Por defecto, las contraseñas deben cumplir:
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número
- Al menos un carácter especial (!@#$%^&*()_+-=[]{}|;:,.<>?)

Estos requisitos están definidos en `PASSWORD_REQUIREMENTS` y pueden ser modificados.

---

## 🔐 Gestión de Sesión

- **Token Expiry**: 24 horas por defecto
- **Refresh Token**: 30 días
- **Auto Logout**: 60 minutos de inactividad
- **Remember Me**: 30 días

Configuración en `SESSION_CONFIG`.

---

## 🚨 Manejo de Errores

Todos los errores de autenticación son parseados y traducidos al español:

```javascript
try {
  await authService.login(credentials);
} catch (error) {
  // El hook useAuth maneja esto automáticamente
  // y establece el error en español
}
```

Tipos de errores soportados:
- Credenciales inválidas
- Usuario no encontrado
- Email ya existe
- Contraseña débil
- Token expirado
- No autorizado
- Email no verificado
- Cuenta suspendida

---

**Última actualización:** 2025-11-22
