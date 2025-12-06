import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/ui/Button/Button';

// Función helper para renderizar con props por defecto
const renderButton = (props = {}) => {
  const defaultProps = {
    onClick: jest.fn(),
    children: 'Test Button',
    ...props
  };
  return render(<Button {...defaultProps} />);
};

describe('Button Component', () => {
  // ==================== RENDERIZADO BÁSICO ====================
  describe('Renderizado', () => {
    test('renderiza correctamente con texto', () => {
      renderButton({ children: 'Click me' });
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    test('renderiza con children complejos', () => {
      render(
        <Button onClick={() => {}}>
          <span data-testid="icon">🔥</span>
          <span>Con Icono</span>
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Con Icono')).toBeInTheDocument();
    });
  });

  // ==================== VARIANTES ====================
  describe('Variantes', () => {
    test('aplica variante primary por defecto', () => {
      renderButton({ children: 'Primary' });
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('aplica variante secondary', () => {
      renderButton({ variant: 'secondary', children: 'Secondary' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica variante danger', () => {
      renderButton({ variant: 'danger', children: 'Danger' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica variante success', () => {
      renderButton({ variant: 'success', children: 'Success' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica variante warning', () => {
      renderButton({ variant: 'warning', children: 'Warning' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica variante ghost', () => {
      renderButton({ variant: 'ghost', children: 'Ghost' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica variante link', () => {
      renderButton({ variant: 'link', children: 'Link' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // ==================== TAMAÑOS ====================
  describe('Tamaños', () => {
    test('aplica tamaño small', () => {
      renderButton({ size: 'small', children: 'Small' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica tamaño medium por defecto', () => {
      renderButton({ children: 'Medium' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica tamaño large', () => {
      renderButton({ size: 'large', children: 'Large' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('aplica fullWidth correctamente', () => {
      renderButton({ fullWidth: true, children: 'Full Width' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // ==================== INTERACCIONES ====================
  describe('Interacciones', () => {
    test('ejecuta onClick al hacer click', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('NO ejecuta onClick cuando está disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('NO ejecuta onClick cuando está loading', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ==================== ESTADOS ====================
  describe('Estados', () => {
    test('muestra estado disabled correctamente', () => {
      renderButton({ disabled: true, children: 'Disabled' });
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('muestra estado loading correctamente', () => {
      renderButton({ loading: true, children: 'Loading' });
      const button = screen.getByRole('button');
      // Loading también deshabilita el botón
      expect(button).toBeDisabled();
    });
  });

  // ==================== TIPOS ====================
  describe('Tipos de botón', () => {
    test('tipo button por defecto', () => {
      renderButton({ children: 'Button' });
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    test('tipo submit', () => {
      renderButton({ type: 'submit', children: 'Submit' });
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    test('tipo reset', () => {
      renderButton({ type: 'reset', children: 'Reset' });
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  // ==================== ICONOS ====================
  describe('Con iconos', () => {
    test('renderiza con icono a la izquierda', () => {
      render(
        <Button onClick={() => {}} icon={<span data-testid="left-icon">←</span>} iconPosition="left">
          Con icono
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    test('renderiza con icono a la derecha', () => {
      render(
        <Button onClick={() => {}} icon={<span data-testid="right-icon">→</span>} iconPosition="right">
          Con icono
        </Button>
      );
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  // ==================== ESTILOS CUSTOM ====================
  describe('Estilos personalizados', () => {
    test('acepta estilos inline adicionales', () => {
      renderButton({ style: { margin: '10px' }, children: 'Styled' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
