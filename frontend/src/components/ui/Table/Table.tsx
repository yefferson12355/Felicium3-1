import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Table Component - Tabla de datos profesional
 * 
 * Props:
 * - columns: Array<{ header: string, key: string, render?: function, width?: string }>
 * - data: Array<Object>
 * - onRowClick: function (opcional)
 * - striped: boolean (filas alternadas)
 * - hoverable: boolean (efecto hover en filas)
 * - bordered: boolean (bordes en todas las celdas)
 * - compact: boolean (menos padding)
 * - loading: boolean
 * - emptyMessage: string
 */
const Table = ({ 
  columns = [], 
  data = [],
  onRowClick,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  loading = false,
  emptyMessage = 'No hay datos disponibles',
  style = {},
  ...props 
}) => {
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const containerStyles = {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.lg,
    border: `${theme.borders.width.thin} solid ${theme.colors.border.default}`,
    boxShadow: theme.shadows.sm,
    overflow: 'hidden' as const,
    ...style,
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
  };

  const headerStyles = {
    backgroundColor: theme.colors.neutral[50],
    borderBottom: `${theme.borders.width.medium} solid ${theme.colors.border.default}`,
  };

  const headerCellStyles = {
    textAlign: 'left',
    padding: compact ? theme.spacing[3] : theme.spacing[4],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderRight: bordered ? `${theme.borders.width.thin} solid ${theme.colors.border.light}` : 'none',
  };

  const getRowStyles = (rowIndex) => ({
    cursor: onRowClick ? 'pointer' : 'default',
    backgroundColor: striped && rowIndex % 2 === 1 
      ? theme.colors.neutral[50]
      : hoveredRow === rowIndex && hoverable
        ? theme.colors.background.hover
        : 'transparent',
    transition: `background-color ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
    borderBottom: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  });

  const cellStyles = {
    padding: compact ? theme.spacing[3] : theme.spacing[4],
    color: theme.colors.text.primary,
    borderRight: bordered ? `${theme.borders.width.thin} solid ${theme.colors.border.light}` : 'none',
  };

  const emptyStyles = {
    padding: theme.spacing[8],
    textAlign: 'center',
    color: theme.colors.text.tertiary,
    fontSize: theme.typography.fontSize.base,
  };

  const loadingStyles = {
    padding: theme.spacing[8],
    textAlign: 'center',
    color: theme.colors.text.secondary,
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <div style={loadingStyles}>
          <div style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${theme.colors.primary[100]}`,
            borderTop: `3px solid ${theme.colors.primary[500]}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }} />
          <p style={{ marginTop: theme.spacing[4] }}>Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={containerStyles}>
        <div style={emptyStyles}>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles} {...props}>
      <table style={tableStyles}>
        <thead>
          <tr style={headerStyles}>
            {columns.map((column, index) => (
              <th 
                key={index} 
                style={{
                  ...headerCellStyles,
                  width: column.width || 'auto',
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              style={getRowStyles(rowIndex)}
              onClick={() => onRowClick && onRowClick(row)}
              onMouseEnter={() => hoverable && setHoveredRow(rowIndex)}
              onMouseLeave={() => hoverable && setHoveredRow(null)}
            >
              {columns.map((column, colIndex) => {
                const columnKey = column.key || column.accessor;
                return (
                  <td key={colIndex} style={cellStyles}>
                    {column.render 
                      ? column.render(row) 
                      : row[columnKey]
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;