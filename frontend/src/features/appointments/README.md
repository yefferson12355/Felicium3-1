# Módulo de Appointments (Citas)

## Descripción

El módulo de **Appointments** maneja toda la funcionalidad relacionada con la gestión de citas dentales en el sistema Felicium. Implementa una arquitectura modular completa con servicios, hooks, utilidades y tipos bien definidos.

## Estructura del Módulo

```
appointments/
├── components/          # Componentes React específicos de citas
├── hooks/              # Custom hooks para lógica reutilizable
│   ├── useAppointments.js
│   ├── useAppointmentForm.js
│   ├── useAppointmentFilters.js
│   └── index.js
├── services/           # Servicios de API
│   ├── appointmentService.js
│   └── index.js
├── types/              # Constantes y tipos
│   ├── appointmentTypes.js
│   ├── appointmentStatus.js
│   └── index.js
└── utils/              # Funciones auxiliares
    ├── dateUtils.js
    ├── validationUtils.js
    ├── filterUtils.js
    └── index.js
```

---

## 📦 Servicios

### `appointmentService`

Servicio centralizado para todas las operaciones de citas.

**Importación:**
```javascript
import { appointmentService } from '../modules/appointments/services';
```

**Métodos disponibles:**

#### CRUD Básico
- `getAll()` - Obtener todas las citas
- `getById(id)` - Obtener cita por ID
- `create(data)` - Crear nueva cita
- `update(id, data)` - Actualizar cita
- `delete(id)` - Eliminar cita

#### Consultas Específicas
- `getByDate(date)` - Citas de una fecha específica
- `getByDateRange(startDate, endDate)` - Citas en rango de fechas
- `getByPatient(patientId)` - Citas de un paciente
- `getByDentist(dentistId)` - Citas de un dentista
- `getToday()` - Citas del día actual
- `getPending()` - Citas pendientes de confirmación

#### Gestión de Estados
- `confirm(id, data)` - Confirmar cita pendiente
- `cancel(id, data)` - Cancelar cita
- `complete(id, data)` - Marcar cita como completada
- `reschedule(id, data)` - Reprogramar cita

#### Utilidades
- `checkAvailability(data)` - Verificar disponibilidad de horario

**Ejemplo de uso:**
```javascript
// Crear una cita
const newAppointment = await appointmentService.create({
  patientId: '123',
  dentistId: '456',
  date: '2025-11-25',
  time: '10:00',
  type: 'checkup',
  reason: 'Revisión general'
});

// Confirmar una cita
await appointmentService.confirm(appointmentId, {
  confirmedBy: 'recepcionista',
  notes: 'Confirmado por teléfono'
});
```

---

## 🎣 Custom Hooks

### `useAppointments`

Hook principal para gestión de citas con estado, carga y operaciones CRUD.

**Importación:**
```javascript
import { useAppointments } from '../modules/appointments/hooks';
```

**Uso:**
```javascript
const {
  appointments,        // Citas filtradas
  allAppointments,    // Todas las citas sin filtrar
  loading,            // Estado de carga
  error,              // Errores
  filters,            // Filtros activos
  
  // Acciones de carga
  fetchAppointments,
  fetchByDate,
  fetchToday,
  fetchPending,
  refresh,
  
  // CRUD
  createAppointment,
  updateAppointment,
  deleteAppointment,
  
  // Gestión de estados
  confirmAppointment,
  cancelAppointment,
  completeAppointment,
  rescheduleAppointment,
  
  // Utilidades
  checkAvailability,
  setFilters,
} = useAppointments();
```

**Ejemplo:**
```javascript
function AppointmentsList() {
  const { appointments, loading, createAppointment } = useAppointments();

  const handleCreate = async (data) => {
    const result = await createAppointment(data);
    if (result.success) {
      console.log('Cita creada:', result.data);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>{apt.patientName} - {apt.date}</div>
      ))}
    </div>
  );
}
```

### `useAppointmentForm`

Hook para manejo de formularios de citas con validación.

**Uso:**
```javascript
const {
  formData,           // Datos del formulario
  errors,             // Errores de validación
  touched,            // Campos tocados
  isSubmitting,       // Estado de envío
  isValid,            // Formulario válido
  isDirty,            // Formulario modificado
  
  handleChange,       // Manejar cambios
  handleBlur,         // Manejar blur
  handleSubmit,       // Manejar submit
  updateField,        // Actualizar campo específico
  reset,              // Resetear formulario
  setData,            // Establecer datos
} = useAppointmentForm(initialData, onSubmit);
```

**Ejemplo:**
```javascript
function AppointmentForm() {
  const handleSubmit = async (data) => {
    await appointmentService.create(data);
  };

  const {
    formData,
    errors,
    handleChange,
    handleSubmit: submit,
    isValid,
  } = useAppointmentForm({}, handleSubmit);

  return (
    <form onSubmit={submit}>
      <input
        name="patientName"
        value={formData.patientName}
        onChange={handleChange}
      />
      {errors.patientName && <span>{errors.patientName}</span>}
      
      <button type="submit" disabled={!isValid}>
        Crear Cita
      </button>
    </form>
  );
}
```

### `useAppointmentFilters`

Hook para filtrado, búsqueda y ordenamiento de citas.

**Uso:**
```javascript
const {
  filteredAppointments,  // Citas filtradas y ordenadas
  filters,               // Filtros activos
  hasActiveFilters,      // Hay filtros activos
  count,                 // Cantidad de resultados
  stats,                 // Estadísticas
  
  updateFilter,          // Actualizar un filtro
  updateFilters,         // Actualizar múltiples filtros
  clearFilters,          // Limpiar todos los filtros
  setSort,               // Establecer ordenamiento
  toggleSortOrder,       // Alternar orden
} = useAppointmentFilters(appointments);
```

---

## 📋 Types y Constantes

### Estados de Citas
```javascript
import { APPOINTMENT_STATUS } from '../modules/appointments/types';

APPOINTMENT_STATUS.PENDING      // 'pending'
APPOINTMENT_STATUS.CONFIRMED    // 'confirmed'
APPOINTMENT_STATUS.CANCELLED    // 'cancelled'
APPOINTMENT_STATUS.COMPLETED    // 'completed'
APPOINTMENT_STATUS.NO_SHOW      // 'no_show'
APPOINTMENT_STATUS.IN_PROGRESS  // 'in_progress'
```

### Tipos de Citas
```javascript
import { APPOINTMENT_TYPES } from '../modules/appointments/types';

APPOINTMENT_TYPES.CHECKUP       // Revisión
APPOINTMENT_TYPES.CLEANING      // Limpieza
APPOINTMENT_TYPES.FILLING       // Empaste
APPOINTMENT_TYPES.EXTRACTION    // Extracción
APPOINTMENT_TYPES.ROOT_CANAL    // Endodoncia
APPOINTMENT_TYPES.EMERGENCY     // Emergencia
// ... más tipos
```

### Configuración de Estados
```javascript
import { getStatusConfig, getStatusLabel, getStatusColor } from '../modules/appointments/types';

const config = getStatusConfig('confirmed');
// { label: 'Confirmada', color: '#4CAF50', icon: '✓', ... }

const label = getStatusLabel('pending');  // 'Pendiente'
const color = getStatusColor('cancelled'); // '#F44336'
```

---

## 🛠️ Utilidades

### Date Utils
```javascript
import { formatDate, formatTime, isToday, addDays } from '../modules/appointments/utils';

formatDate('2025-11-25');           // 'Lunes, 25 de Noviembre de 2025'
formatTime('14:30');                // '14:30' o '2:30 PM'
isToday('2025-11-22');              // true/false
addDays('2025-11-22', 7);           // '2025-11-29'
```

### Validation Utils
```javascript
import { validateAppointment, validateAvailability } from '../modules/appointments/utils';

const { valid, errors } = validateAppointment(appointmentData);
const { available, reason } = validateAvailability(date, time, existingAppointments);
```

### Filter Utils
```javascript
import { filterByStatus, searchAppointments, sortByDateTime } from '../modules/appointments/utils';

const confirmed = filterByStatus(appointments, 'confirmed');
const results = searchAppointments(appointments, 'Juan');
const sorted = sortByDateTime(appointments, 'asc');
```

---

## 🎯 Patrones de Uso

### Patrón 1: Lista de Citas con Filtros
```javascript
function AppointmentsList() {
  const { appointments, loading } = useAppointments();
  const { filteredAppointments, updateFilter } = useAppointmentFilters(appointments);

  return (
    <div>
      <select onChange={(e) => updateFilter('status', e.target.value)}>
        <option value="">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="confirmed">Confirmadas</option>
      </select>
      
      {filteredAppointments.map(apt => (
        <AppointmentCard key={apt.id} appointment={apt} />
      ))}
    </div>
  );
}
```

### Patrón 2: Crear Cita con Formulario
```javascript
function CreateAppointment() {
  const { createAppointment } = useAppointments();
  
  const handleSubmit = async (data) => {
    const result = await createAppointment(data);
    if (result.success) {
      // Mostrar éxito
    }
  };

  const form = useAppointmentForm({}, handleSubmit);

  return <AppointmentForm {...form} />;
}
```

### Patrón 3: Gestión de Estados
```javascript
function AppointmentActions({ appointment }) {
  const { confirmAppointment, cancelAppointment } = useAppointments();

  const handleConfirm = async () => {
    await confirmAppointment(appointment.id);
  };

  const handleCancel = async () => {
    await cancelAppointment(appointment.id, { reason: 'Cancelado por paciente' });
  };

  return (
    <div>
      <button onClick={handleConfirm}>Confirmar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
}
```

---

## 📝 Notas Importantes

1. **Todos los servicios retornan Promises** - Usar async/await o .then()
2. **Los hooks manejan el estado automáticamente** - No necesitas useState adicional
3. **Las validaciones son automáticas** - useAppointmentForm valida en tiempo real
4. **Los filtros son reactivos** - Se actualizan automáticamente
5. **Manejo de errores incluido** - Todos los hooks exponen `error` y `loading`

---

## 🔄 Patrón para Otros Módulos

Esta estructura debe replicarse en:
- `modules/patients/`
- `modules/billing/`
- `modules/medical/`
- `modules/dashboard/`

Cada módulo debe tener:
- ✅ `services/` - Servicios de API
- ✅ `hooks/` - Custom hooks
- ✅ `types/` - Constantes y tipos
- ✅ `utils/` - Funciones auxiliares
- ✅ `README.md` - Documentación

---

**Última actualización:** 2025-11-22
