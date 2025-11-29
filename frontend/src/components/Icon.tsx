import React from 'react';
import dashboardIcon from '../assets/icons/dashboard.svg';
import calendarIcon from '../assets/icons/calendar--heat-map.svg';
import citasIcon from '../assets/icons/citas.svg';
import pacientesIcon from '../assets/icons/pacientes.svg';
import stafIcon from '../assets/icons/staf.svg';
import settingsIcon from '../assets/icons/settings.svg';
import reportsIcon from '../assets/icons/reports.svg';
import ibmBluepayIcon from '../assets/icons/ibm--bluepay.svg';

const Icon = ({ name, size = 24, className = '', style = {} }) => {
  const getIcon = () => {
    switch(name) {
      case 'dashboard':
        return dashboardIcon;
      case 'citas':
        return citasIcon;
      case 'calendar':
        return calendarIcon;
      case 'pacientes':
      case 'patients':
        return pacientesIcon;
      case 'staff':
      case 'staf':
        return stafIcon;
      case 'settings':
        return settingsIcon;
      case 'reportes':
      case 'reports':
        return reportsIcon;
      case 'pagos':
      case 'payments':
        return ibmBluepayIcon;
      case 'mis_pacientes':
      case 'doctor':
        return stafIcon; // using staf icon for doctor as it represents healthcare staff
      default:
        return null;
    }
  };

  const iconPath = getIcon();

  if (!iconPath) {
    return null;
  }

  return (
    <img 
      src={iconPath} 
      alt={name}
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
};

export default Icon;