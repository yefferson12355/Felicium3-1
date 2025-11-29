import React, { createContext, useContext, useState } from 'react';

// Create the context
const AdminContext = createContext();

// Custom hook to use the Admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// AdminProvider component
export const AdminProvider = ({ children }) => {
  // Mock data for widgets
  const [adminData, setAdminData] = useState({
    ingresosMes: 22000,
    ingresosMesAnterior: 20000,
    citasAtendidas: 42,
    citasTotales: 50,
    pacientesActivos: 128,
    graficoIngresos: [12000, 15000, 13000, 18000, 20000, 22000],
    citasHoy: 12,
    pacientesNuevos: 3,
    ingresosHoy: 2400
  });

  // Mock data for staff management
  const [staff, setStaff] = useState([
    { id: 1, nombre: 'Dr. Carlos López', rol: 'dentista', email: 'carlos.lopez@clinica.com', estado: 'activo', especialidad: 'Ortodoncia' },
    { id: 2, nombre: 'Dra. María García', rol: 'dentista', email: 'maria.garcia@clinica.com', estado: 'activo', especialidad: 'Implantes' },
    { id: 3, nombre: 'Ana Rodríguez', rol: 'recepcionista', email: 'ana.rodriguez@clinica.com', estado: 'activo', especialidad: null },
    { id: 4, nombre: 'Luis Fernández', rol: 'admin', email: 'luis.fernandez@clinica.com', estado: 'activo', especialidad: null },
    { id: 5, nombre: 'Sofía Martínez', rol: 'auxiliar', email: 'sofia.martinez@clinica.com', estado: 'inactivo', especialidad: null }
  ]);

  // Mock data for appointment types
  const [tiposCita, setTiposCita] = useState([
    { id: 1, nombre: 'Limpieza', duracion: 45, color: '#3498db' },
    { id: 2, nombre: 'Revisión', duracion: 30, color: '#2ecc71' },
    { id: 3, nombre: 'Endodoncia', duracion: 90, color: '#e74c3c' },
    { id: 4, nombre: 'Extracción', duracion: 60, color: '#f39c12' },
    { id: 5, nombre: 'Blanqueamiento', duracion: 90, color: '#9b59b6' }
  ]);

  // Mock data for services
  const [servicios, setServicios] = useState([
    { id: 1, codigo: 'LIM-001', servicio: 'Limpieza dental', precio_estandar: 150.00, duracion: 45 },
    { id: 2, codigo: 'REV-001', servicio: 'Revisión general', precio_estandar: 100.00, duracion: 30 },
    { id: 3, codigo: 'END-001', servicio: 'Endodoncia molar', precio_estandar: 450.00, duracion: 90 },
    { id: 4, codigo: 'EXT-001', servicio: 'Extracción simple', precio_estandar: 300.00, duracion: 45 },
    { id: 5, codigo: 'BLA-001', servicio: 'Blanqueamiento', precio_estandar: 350.00, duracion: 60 }
  ]);

  // Calculate derived values
  const variacionIngresos = ((adminData.ingresosMes - adminData.ingresosMesAnterior) / adminData.ingresosMesAnterior) * 100;
  const cumplimientoCitas = (adminData.citasAtendidas / adminData.citasTotales) * 100;

  const value = {
    adminData,
    setAdminData,
    staff,
    setStaff,
    tiposCita,
    setTiposCita,
    servicios,
    setServicios,
    variacionIngresos,
    cumplimientoCitas
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};