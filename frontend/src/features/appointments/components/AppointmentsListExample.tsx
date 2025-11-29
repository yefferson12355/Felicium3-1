import React from 'react';
import { useAppointments, useAppointmentFilters } from '../hooks';
import { getStatusLabel, getStatusColor, APPOINTMENT_STATUS } from '../types';
import { formatDate, formatTime } from '../utils';

/**
 * Componente de ejemplo que demuestra el uso de la arquitectura modular
 * Este componente muestra cómo usar los hooks y utilidades del módulo
 */
const AppointmentsListExample = () => {
    const {
        appointments,
        loading,
        error,
        confirmAppointment,
        cancelAppointment,
        refresh,
    } = useAppointments();

    const {
        filteredAppointments,
        filters,
        updateFilter,
        clearFilters,
        hasActiveFilters,
        stats,
    } = useAppointmentFilters(appointments);

    const handleConfirm = async (id) => {
        const result = await confirmAppointment(id);
        if (result.success) {
            alert('Cita confirmada exitosamente');
        } else {
            alert(`Error: ${result.error}`);
        }
    };

    const handleCancel = async (id) => {
        const reason = prompt('Ingrese la razón de cancelación:');
        if (reason) {
            const result = await cancelAppointment(id, { reason });
            if (result.success) {
                alert('Cita cancelada exitosamente');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Cargando citas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <p>Error: {error}</p>
                <button onClick={refresh}>Reintentar</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Gestión de Citas - Ejemplo de Arquitectura Modular</h2>

            {/* Filtros */}
            <div style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
            }}>
                <h3>Filtros</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <select
                        value={filters.status}
                        onChange={(e) => updateFilter('status', e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px' }}
                    >
                        <option value="">Todos los estados</option>
                        <option value={APPOINTMENT_STATUS.PENDING}>Pendientes</option>
                        <option value={APPOINTMENT_STATUS.CONFIRMED}>Confirmadas</option>
                        <option value={APPOINTMENT_STATUS.CANCELLED}>Canceladas</option>
                        <option value={APPOINTMENT_STATUS.COMPLETED}>Completadas</option>
                    </select>

                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => updateFilter('date', e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px' }}
                    />

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', flex: 1 }}
                    />

                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>

                <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    Mostrando {stats.filtered} de {stats.total} citas
                    {stats.hidden > 0 && ` (${stats.hidden} ocultas por filtros)`}
                </div>
            </div>

            {/* Lista de citas */}
            <div style={{ display: 'grid', gap: '15px' }}>
                {filteredAppointments.length === 0 ? (
                    <div style={{
                        padding: '40px',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px'
                    }}>
                        <p>No hay citas que mostrar</p>
                    </div>
                ) : (
                    filteredAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            style={{
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 10px 0' }}>
                                        {appointment.patientName || appointment.patient?.name || 'Paciente'}
                                    </h4>

                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                                        <strong>Fecha:</strong> {formatDate(appointment.date)}
                                    </div>

                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                                        <strong>Hora:</strong> {formatTime(appointment.time)}
                                    </div>

                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                                        <strong>Dentista:</strong> {appointment.dentistName || appointment.dentist?.name || 'N/A'}
                                    </div>

                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                                        <strong>Tipo:</strong> {appointment.type}
                                    </div>

                                    {appointment.reason && (
                                        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                                            <strong>Motivo:</strong> {appointment.reason}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                                    <span
                                        style={{
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor: getStatusColor(appointment.status) + '20',
                                            color: getStatusColor(appointment.status),
                                        }}
                                    >
                                        {getStatusLabel(appointment.status)}
                                    </span>

                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        {appointment.status === APPOINTMENT_STATUS.PENDING && (
                                            <button
                                                onClick={() => handleConfirm(appointment.id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                Confirmar
                                            </button>
                                        )}

                                        {(appointment.status === APPOINTMENT_STATUS.PENDING ||
                                            appointment.status === APPOINTMENT_STATUS.CONFIRMED) && (
                                                <button
                                                    onClick={() => handleCancel(appointment.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: '#f44336',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Botón de refrescar */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={refresh}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Refrescar Citas
                </button>
            </div>
        </div>
    );
};

export default AppointmentsListExample;
