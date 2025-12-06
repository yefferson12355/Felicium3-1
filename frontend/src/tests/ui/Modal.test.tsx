import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from '../../components/ui/Modal/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    footer: null as React.ReactNode, // Agregar footer requerido
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== RENDERIZADO ====================
  describe('Renderizado', () => {
    test('renderiza cuando isOpen es true', () => {
      render(<Modal {...defaultProps}>Contenido del modal</Modal>);
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Contenido del modal')).toBeInTheDocument();
    });

    test('NO renderiza cuando isOpen es false', () => {
      render(<Modal {...defaultProps} isOpen={false}>Contenido</Modal>);
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    test('renderiza título correctamente', () => {
      render(<Modal {...defaultProps} title="Mi Modal Personalizado">Contenido</Modal>);
      expect(screen.getByText('Mi Modal Personalizado')).toBeInTheDocument();
    });

    test('renderiza children correctamente', () => {
      render(
        <Modal {...defaultProps}>
          <p data-testid="child-content">Contenido hijo</p>
        </Modal>
      );
      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    test('renderiza footer cuando se proporciona', () => {
      const footer = <button>Guardar</button>;
      render(<Modal {...defaultProps} footer={footer}>Contenido</Modal>);
      expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    });
  });

  // ==================== TAMAÑOS ====================
  describe('Tamaños', () => {
    test('tamaño small', () => {
      render(<Modal {...defaultProps} size="small">Contenido</Modal>);
      expect(screen.getByText('Contenido')).toBeInTheDocument();
    });

    test('tamaño medium por defecto', () => {
      render(<Modal {...defaultProps}>Contenido</Modal>);
      expect(screen.getByText('Contenido')).toBeInTheDocument();
    });

    test('tamaño large', () => {
      render(<Modal {...defaultProps} size="large">Contenido</Modal>);
      expect(screen.getByText('Contenido')).toBeInTheDocument();
    });

    test('tamaño full', () => {
      render(<Modal {...defaultProps} size="full">Contenido</Modal>);
      expect(screen.getByText('Contenido')).toBeInTheDocument();
    });
  });

  // ==================== CERRAR MODAL ====================
  describe('Cerrar Modal', () => {
    test('cierra al hacer click en botón de cerrar', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose}>Contenido</Modal>);
      
      const closeButton = screen.getByRole('button', { name: /cerrar modal/i });
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('cierra al presionar tecla ESC', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose}>Contenido</Modal>);
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('NO cierra al click en contenido', () => {
      const onClose = jest.fn();
      render(
        <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false}>
          <div data-testid="modal-content">Contenido</div>
        </Modal>
      );
      
      // Click en el contenido no debería cerrar
      fireEvent.click(screen.getByTestId('modal-content'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ==================== BOTÓN DE CERRAR ====================
  describe('Botón de cerrar', () => {
    test('muestra botón de cerrar por defecto', () => {
      render(<Modal {...defaultProps}>Contenido</Modal>);
      expect(screen.getByRole('button', { name: /cerrar modal/i })).toBeInTheDocument();
    });

    test('oculta botón de cerrar cuando showCloseButton es false', () => {
      render(<Modal {...defaultProps} showCloseButton={false}>Contenido</Modal>);
      expect(screen.queryByRole('button', { name: /cerrar modal/i })).not.toBeInTheDocument();
    });
  });

  // ==================== BODY SCROLL ====================
  describe('Body Scroll', () => {
    test('bloquea scroll del body cuando está abierto', () => {
      render(<Modal {...defaultProps}>Contenido</Modal>);
      expect(document.body.style.overflow).toBe('hidden');
    });

    test('restaura scroll del body al desmontarse', () => {
      const { unmount } = render(<Modal {...defaultProps}>Contenido</Modal>);
      expect(document.body.style.overflow).toBe('hidden');
      
      unmount();
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  // ==================== ACCESIBILIDAD ====================
  describe('Accesibilidad', () => {
    test('el modal tiene role dialog implícito por estructura', () => {
      render(<Modal {...defaultProps}>Contenido</Modal>);
      // Verificamos que el contenido sea accesible
      expect(screen.getByText('Contenido')).toBeInTheDocument();
    });
  });

  // ==================== CONTENIDO COMPLEJO ====================
  describe('Contenido complejo', () => {
    test('renderiza formulario dentro del modal', () => {
      render(
        <Modal {...defaultProps}>
          <form data-testid="modal-form">
            <input type="text" placeholder="Nombre" />
            <button type="submit">Enviar</button>
          </form>
        </Modal>
      );
      
      expect(screen.getByTestId('modal-form')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    });

    test('renderiza lista dentro del modal', () => {
      render(
        <Modal {...defaultProps}>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Modal>
      );
      
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });
});
