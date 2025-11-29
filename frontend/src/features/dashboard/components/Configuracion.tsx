import React, { useState } from 'react';

const Configuracion = () => {
    const [config, setConfig] = useState({
        nombreClinica: 'Clínica Dental Sonrisa Perfecta',
        direccion: 'Av. Principal 123, Lima, Perú',
        telefono: '555-1234',
        email: 'contacto@clinica.com',
        horarioApertura: '08:00',
        horarioCierre: '18:00',
        duracionCita: '30',
        notificacionesEmail: true,
        notificacionesSMS: false,
        recordatoriosCitas: true,
        diasAnticipacion: '1'
    });

    const handleChange = (field, value) => {
        setConfig(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        alert('Configuración guardada exitosamente');
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#FAFBFC',
            minHeight: 'calc(100vh - 100px)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#172B4D',
                    margin: 0
                }}>
                    Configuración del Sistema
                </h1>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '10px 16px',
                        backgroundColor: '#36B37E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    Guardar Cambios
                </button>
            </div>

            {/* General Settings */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
                marginBottom: '20px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#172B4D',
                    marginBottom: '16px'
                }}>
                    Información General
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#172B4D',
                            marginBottom: '4px'
                        }}>
                            Nombre de la Clínica
                        </label>
                        <input
                            type="text"
                            value={config.nombreClinica}
                            onChange={(e) => handleChange('nombreClinica', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #DFE1E6',
                                borderRadius: '3px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#172B4D',
                            marginBottom: '4px'
                        }}>
                            Dirección
                        </label>
                        <input
                            type="text"
                            value={config.direccion}
                            onChange={(e) => handleChange('direccion', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #DFE1E6',
                                borderRadius: '3px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D',
                                marginBottom: '4px'
                            }}>
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                value={config.telefono}
                                onChange={(e) => handleChange('telefono', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #DFE1E6',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D',
                                marginBottom: '4px'
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={config.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #DFE1E6',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule Settings */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
                marginBottom: '20px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#172B4D',
                    marginBottom: '16px'
                }}>
                    Horarios y Citas
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D',
                                marginBottom: '4px'
                            }}>
                                Hora de Apertura
                            </label>
                            <input
                                type="time"
                                value={config.horarioApertura}
                                onChange={(e) => handleChange('horarioApertura', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #DFE1E6',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D',
                                marginBottom: '4px'
                            }}>
                                Hora de Cierre
                            </label>
                            <input
                                type="time"
                                value={config.horarioCierre}
                                onChange={(e) => handleChange('horarioCierre', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #DFE1E6',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#172B4D',
                            marginBottom: '4px'
                        }}>
                            Duración de Cita (minutos)
                        </label>
                        <select
                            value={config.duracionCita}
                            onChange={(e) => handleChange('duracionCita', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #DFE1E6',
                                borderRadius: '3px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="15">15 minutos</option>
                            <option value="30">30 minutos</option>
                            <option value="45">45 minutos</option>
                            <option value="60">60 minutos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#172B4D',
                    marginBottom: '16px'
                }}>
                    Notificaciones
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#F4F5F7',
                        borderRadius: '3px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D'
                            }}>
                                Notificaciones por Email
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: '#6B778C',
                                marginTop: '4px'
                            }}>
                                Enviar notificaciones a pacientes por correo electrónico
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={config.notificacionesEmail}
                            onChange={(e) => handleChange('notificacionesEmail', e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#F4F5F7',
                        borderRadius: '3px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D'
                            }}>
                                Notificaciones por SMS
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: '#6B778C',
                                marginTop: '4px'
                            }}>
                                Enviar notificaciones a pacientes por mensaje de texto
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={config.notificacionesSMS}
                            onChange={(e) => handleChange('notificacionesSMS', e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: '#F4F5F7',
                        borderRadius: '3px'
                    }}>
                        <div>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#172B4D'
                            }}>
                                Recordatorios de Citas
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: '#6B778C',
                                marginTop: '4px'
                            }}>
                                Enviar recordatorios automáticos antes de las citas
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={config.recordatoriosCitas}
                            onChange={(e) => handleChange('recordatoriosCitas', e.target.checked)}
                            style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#172B4D',
                            marginBottom: '4px'
                        }}>
                            Días de Anticipación para Recordatorios
                        </label>
                        <select
                            value={config.diasAnticipacion}
                            onChange={(e) => handleChange('diasAnticipacion', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #DFE1E6',
                                borderRadius: '3px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="1">1 día antes</option>
                            <option value="2">2 días antes</option>
                            <option value="3">3 días antes</option>
                            <option value="7">1 semana antes</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
