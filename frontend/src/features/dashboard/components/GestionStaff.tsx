import React, { useState } from 'react';

const GestionStaff = () => {
    const [staff] = useState([
        { id: 1, nombre: 'Dr. Juan López', rol: 'Dentista', especialidad: 'Ortodoncia', telefono: '555-0101', email: 'jlopez@clinica.com', estado: 'Activo' },
        { id: 2, nombre: 'Dra. María Rojas', rol: 'Dentista', especialidad: 'Endodoncia', telefono: '555-0102', email: 'mrojas@clinica.com', estado: 'Activo' },
        { id: 3, nombre: 'Ana García', rol: 'Recepcionista', especialidad: '-', telefono: '555-0103', email: 'agarcia@clinica.com', estado: 'Activo' },
        { id: 4, nombre: 'Carlos Mendoza', rol: 'Recepcionista', especialidad: '-', telefono: '555-0104', email: 'cmendoza@clinica.com', estado: 'Activo' },
        { id: 5, nombre: 'Dr. Pedro Sánchez', rol: 'Dentista', especialidad: 'Periodoncia', telefono: '555-0105', email: 'psanchez@clinica.com', estado: 'Inactivo' },
    ]);

    const [showModal, setShowModal] = useState(false);

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
                    Gestión de Staff
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    style={{
                        padding: '10px 16px',
                        backgroundColor: '#0052CC',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    + Agregar Personal
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '24px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B778C' }}>Total Personal</h3>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#172B4D' }}>5</p>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B778C' }}>Dentistas</h3>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#172B4D' }}>3</p>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B778C' }}>Recepcionistas</h3>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#172B4D' }}>2</p>
                </div>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)'
                }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B778C' }}>Activos</h3>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#36B37E' }}>4</p>
                </div>
            </div>

            {/* Staff Table */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 1px rgba(9, 30, 66, 0.25)',
                overflow: 'hidden'
            }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: '#F4F5F7',
                            borderBottom: '2px solid #DFE1E6'
                        }}>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Nombre
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Rol
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Especialidad
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Teléfono
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Email
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Estado
                            </th>
                            <th style={{
                                textAlign: 'left',
                                padding: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#172B4D'
                            }}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((empleado) => (
                            <tr key={empleado.id} style={{
                                borderBottom: '1px solid #DFE1E6'
                            }}>
                                <td style={{
                                    padding: '12px',
                                    color: '#172B4D',
                                    fontWeight: 500
                                }}>
                                    {empleado.nombre}
                                </td>
                                <td style={{
                                    padding: '12px',
                                    color: '#172B4D'
                                }}>
                                    {empleado.rol}
                                </td>
                                <td style={{
                                    padding: '12px',
                                    color: '#6B778C'
                                }}>
                                    {empleado.especialidad}
                                </td>
                                <td style={{
                                    padding: '12px',
                                    color: '#6B778C'
                                }}>
                                    {empleado.telefono}
                                </td>
                                <td style={{
                                    padding: '12px',
                                    color: '#6B778C'
                                }}>
                                    {empleado.email}
                                </td>
                                <td style={{
                                    padding: '12px'
                                }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '3px',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        backgroundColor: empleado.estado === 'Activo' ? '#E6FCBF' : '#FFEBE6',
                                        color: empleado.estado === 'Activo' ? '#36B37E' : '#BF2600'
                                    }}>
                                        {empleado.estado}
                                    </span>
                                </td>
                                <td style={{
                                    padding: '12px'
                                }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#0052CC',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}>
                                            Editar
                                        </button>
                                        <button style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#BF2600',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding staff */}
            {showModal && (
                <div style={{
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
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#172B4D',
                            marginBottom: '16px'
                        }}>
                            Agregar Personal
                        </h2>
                        <p style={{ color: '#6B778C', marginBottom: '16px' }}>
                            Funcionalidad de agregar personal próximamente...
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#0052CC',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionStaff;
