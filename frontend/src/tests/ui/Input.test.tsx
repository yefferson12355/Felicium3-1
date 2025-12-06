import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/ui/Input/Input';

// Props por defecto para evitar errores de TypeScript
const defaultProps = {
  id: 'test-input',
  label: 'Test Label',
  placeholder: 'Test placeholder',
  value: '',
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  helperText: '',
  error: '',
};

// Helper para renderizar Input con props por defecto
const renderInput = (props = {}) => {
  return render(<Input {...defaultProps} {...props} />);
};

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== RENDERIZADO BÁSICO ====================
  describe('Renderizado', () => {
    test('renderiza correctamente', () => {
      renderInput();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renderiza con label', () => {
      renderInput({ label: 'Email' });
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    test('renderiza con placeholder', () => {
      renderInput({ placeholder: 'Ingresa tu email' });
      expect(screen.getByPlaceholderText('Ingresa tu email')).toBeInTheDocument();
    });

    test('renderiza con helperText', () => {
      renderInput({ helperText: 'Este campo es obligatorio' });
      expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
    });
  });

  // ==================== TIPOS DE INPUT ====================
  describe('Tipos', () => {
    test('tipo text por defecto', () => {
      renderInput();
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    test('tipo email', () => {
      renderInput({ type: 'email' });
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    test('tipo password', () => {
      renderInput({ type: 'password' });
      // Password no tiene role textbox
      expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
    });

    test('tipo number', () => {
      renderInput({ type: 'number' });
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    test('tipo tel', () => {
      renderInput({ type: 'tel' });
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });
  });

  // ==================== TAMAÑOS ====================
  describe('Tamaños', () => {
    test('tamaño small', () => {
      renderInput({ size: 'small' });
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('tamaño medium por defecto', () => {
      renderInput();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('tamaño large', () => {
      renderInput({ size: 'large' });
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // ==================== INTERACCIONES ====================
  describe('Interacciones', () => {
    test('permite escribir texto', () => {
      const handleChange = jest.fn();
      renderInput({ onChange: handleChange });
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Hola mundo' } });
      
      expect(handleChange).toHaveBeenCalled();
    });

    test('ejecuta onFocus al enfocar', () => {
      const handleFocus = jest.fn();
      renderInput({ onFocus: handleFocus });
      
      fireEvent.focus(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test('ejecuta onBlur al perder foco', () => {
      const handleBlur = jest.fn();
      renderInput({ onBlur: handleBlur });
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    test('muestra valor controlado', () => {
      renderInput({ value: 'valor inicial' });
      expect(screen.getByRole('textbox')).toHaveValue('valor inicial');
    });
  });

  // ==================== ESTADOS ====================
  describe('Estados', () => {
    test('estado disabled', () => {
      renderInput({ disabled: true });
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    test('estado required muestra asterisco', () => {
      renderInput({ label: 'Campo', required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    test('estado error muestra mensaje', () => {
      renderInput({ error: 'Este campo tiene un error' });
      expect(screen.getByText('Este campo tiene un error')).toBeInTheDocument();
    });

    test('estado success', () => {
      renderInput({ success: true });
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // ==================== FULLWIDTH ====================
  describe('FullWidth', () => {
    test('fullWidth true por defecto', () => {
      renderInput();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('fullWidth false', () => {
      renderInput({ fullWidth: false });
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  // ==================== ACCESIBILIDAD ====================
  describe('Accesibilidad', () => {
    test('label conectado con input via htmlFor', () => {
      renderInput({ id: 'email-input', label: 'Email' });
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    test('input tiene id correcto', () => {
      renderInput({ id: 'my-custom-id' });
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-custom-id');
    });
  });
});
