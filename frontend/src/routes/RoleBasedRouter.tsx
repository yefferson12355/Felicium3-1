import React, { useState, useEffect } from 'react';
import allRoutes from './AppRouter';

const RoleBasedRouter = ({ role = 'paciente', userName = 'Usuario' }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash);
      
      // Extraer la vista del hash
      // Por ejemplo: #admin/staff → view = 'staff'
      // #admin → view = 'dashboard'
      const hashParts = hash.replace('#', '').split('/');
      if (hashParts.length > 1) {
        setView(hashParts[1]);
      } else {
        setView('dashboard');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Filtrar rutas según el rol del usuario
  const getRoleRoutes = () => {
    const routes = {};

    // Agregar rutas comunes a todos los roles
    Object.keys(allRoutes).forEach(route => {
      if (route.includes('/perfil') || route.includes('#perfil')) {
        routes[route] = allRoutes[route];
      }
    });

    // Agregar rutas específicas según el rol
    switch (role) {
      case 'paciente':
        Object.keys(allRoutes).forEach(route => {
          if (route.includes('/paciente') || route.includes('#paciente') || route.includes('#citas') || route.includes('/citas')) {
            routes[route] = allRoutes[route];
          }
        });
        break;
      case 'recepcionista':
        Object.keys(allRoutes).forEach(route => {
          if (route.includes('/recepcionista') || route.includes('#recepcionista') || route.includes('#citas') || route.includes('/citas')) {
            routes[route] = allRoutes[route];
          }
        });
        break;
      case 'dentista':
        Object.keys(allRoutes).forEach(route => {
          if (route.includes('/dentista') || route.includes('#dentista') ||
            route.includes('/doctor') || route.includes('#doctor') ||
            route.includes('#citas') || route.includes('/citas')) {
            routes[route] = allRoutes[route];
          }
        });
        break;
      case 'admin':
        Object.keys(allRoutes).forEach(route => {
          if (route.includes('/admin') || route.includes('#admin') || route.includes('#citas') || route.includes('/citas')) {
            routes[route] = allRoutes[route];
          }
        });
        break;
      default:
        break;
    }

    return routes;
  };

  const roleRoutes = getRoleRoutes();

  // Determinar qué componente renderizar
  let CurrentComponent = null;

  // Primero intenta una coincidencia exacta con el hash actual
  if (currentPath && roleRoutes[currentPath]) {
    CurrentComponent = roleRoutes[currentPath];
  } else if (currentPath === '' || currentPath === '#') {
    // Si no hay hash, usa la ruta base para el rol (ej: #admin)
    const basePath = `#${role}`;
    CurrentComponent = roleRoutes[basePath];
    
    // Si tampoco encuentra esa, intenta con /admin
    if (!CurrentComponent) {
      const altPath = `/${role}`;
      CurrentComponent = roleRoutes[altPath];
    }
  } else {
    // Si el hash tiene algo específico, intenta buscar una coincidencia similar
    const hashParts = currentPath.replace('#', '').split('/');
    const basePath = `#${hashParts[0]}`;
    
    CurrentComponent = roleRoutes[basePath];
    if (!CurrentComponent) {
      const altPath = `/${hashParts[0]}`;
      CurrentComponent = roleRoutes[altPath];
    }
  }

  // Si aún no encuentra nada, muestra error
  if (!CurrentComponent) {
    CurrentComponent = () => (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>Ruta no encontrada: {currentPath || 'home'}</p>
        <p>Rol: {role}</p>
        <p>View: {view}</p>
        <p>Rutas disponibles: {Object.keys(roleRoutes).join(', ')}</p>
      </div>
    );
  }

  // ✨ CLAVE: Pasar 'view' prop al componente
  return (
    <div>
      <CurrentComponent role={role} userName={userName} view={view} />
    </div>
  );
};

export default RoleBasedRouter;