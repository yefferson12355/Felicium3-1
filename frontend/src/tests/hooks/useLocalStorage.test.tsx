import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../core/hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  // Limpiar localStorage antes de cada test
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  // ==================== INICIALIZACIÓN ====================
  describe('Inicialización', () => {
    test('retorna valor inicial cuando localStorage está vacío', () => {
      const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
      
      expect(result.current[0]).toBe('defaultValue');
    });

    test('retorna valor de localStorage si existe', () => {
      window.localStorage.setItem('existingKey', JSON.stringify('storedValue'));
      
      const { result } = renderHook(() => useLocalStorage('existingKey', 'defaultValue'));
      
      expect(result.current[0]).toBe('storedValue');
    });

    test('maneja objetos como valor inicial', () => {
      const initialObject = { name: 'Test', age: 25 };
      const { result } = renderHook(() => useLocalStorage('objectKey', initialObject));
      
      expect(result.current[0]).toEqual(initialObject);
    });

    test('maneja arrays como valor inicial', () => {
      const initialArray = [1, 2, 3, 4, 5];
      const { result } = renderHook(() => useLocalStorage('arrayKey', initialArray));
      
      expect(result.current[0]).toEqual(initialArray);
    });

    test('maneja booleanos como valor inicial', () => {
      const { result } = renderHook(() => useLocalStorage('boolKey', true));
      
      expect(result.current[0]).toBe(true);
    });

    test('maneja null como valor inicial', () => {
      const { result } = renderHook(() => useLocalStorage('nullKey', null));
      
      expect(result.current[0]).toBe(null);
    });
  });

  // ==================== SETTER ====================
  describe('setValue', () => {
    test('actualiza el valor en estado y localStorage', () => {
      const { result } = renderHook(() => useLocalStorage('updateKey', 'initial'));
      
      act(() => {
        result.current[1]('newValue');
      });
      
      expect(result.current[0]).toBe('newValue');
      expect(JSON.parse(window.localStorage.getItem('updateKey')!)).toBe('newValue');
    });

    test('acepta función como argumento (like useState)', () => {
      const { result } = renderHook(() => useLocalStorage('counterKey', 0));
      
      act(() => {
        result.current[1]((prev: number) => prev + 1);
      });
      
      expect(result.current[0]).toBe(1);
      
      act(() => {
        result.current[1]((prev: number) => prev + 5);
      });
      
      expect(result.current[0]).toBe(6);
    });

    test('actualiza objeto correctamente', () => {
      const { result } = renderHook(() => useLocalStorage('userKey', { name: 'John' }));
      
      act(() => {
        result.current[1]({ name: 'Jane', email: 'jane@test.com' });
      });
      
      expect(result.current[0]).toEqual({ name: 'Jane', email: 'jane@test.com' });
    });

    test('actualiza array correctamente', () => {
      const { result } = renderHook(() => useLocalStorage('itemsKey', [1, 2]));
      
      act(() => {
        result.current[1]([1, 2, 3, 4]);
      });
      
      expect(result.current[0]).toEqual([1, 2, 3, 4]);
    });
  });

  // ==================== REMOVE ====================
  describe('removeValue', () => {
    test('elimina valor de localStorage y resetea al valor inicial', () => {
      const { result } = renderHook(() => useLocalStorage('removeKey', 'default'));
      
      // Primero setear un valor
      act(() => {
        result.current[1]('stored');
      });
      expect(result.current[0]).toBe('stored');
      
      // Luego remover
      act(() => {
        result.current[2]();
      });
      
      expect(result.current[0]).toBe('default');
      expect(window.localStorage.getItem('removeKey')).toBeNull();
    });
  });

  // ==================== PERSISTENCIA ====================
  describe('Persistencia', () => {
    test('persiste valores entre re-renders', () => {
      const { result, rerender } = renderHook(() => useLocalStorage('persistKey', 'initial'));
      
      act(() => {
        result.current[1]('persisted');
      });
      
      rerender();
      
      expect(result.current[0]).toBe('persisted');
    });

    test('valor persiste cuando se monta nuevo hook con misma key', () => {
      // Primer render - setear valor
      const { result: firstResult, unmount: firstUnmount } = renderHook(() => 
        useLocalStorage('sharedKey', 'initial')
      );
      
      act(() => {
        firstResult.current[1]('sharedValue');
      });
      
      firstUnmount();
      
      // Segundo render - debería obtener valor guardado
      const { result: secondResult } = renderHook(() => 
        useLocalStorage('sharedKey', 'initial')
      );
      
      expect(secondResult.current[0]).toBe('sharedValue');
    });
  });

  // ==================== MANEJO DE ERRORES ====================
  describe('Manejo de errores', () => {
    test('maneja JSON inválido en localStorage gracefully', () => {
      // Simular JSON inválido en localStorage
      window.localStorage.setItem('invalidKey', 'not valid json{');
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const { result } = renderHook(() => useLocalStorage('invalidKey', 'fallback'));
      
      // Debería retornar el valor por defecto
      expect(result.current[0]).toBe('fallback');
      
      consoleSpy.mockRestore();
    });
  });

  // ==================== DIFERENTES TIPOS DE DATOS ====================
  describe('Diferentes tipos de datos', () => {
    test('maneja strings', () => {
      const { result } = renderHook(() => useLocalStorage('stringKey', ''));
      
      act(() => {
        result.current[1]('Hello World');
      });
      
      expect(result.current[0]).toBe('Hello World');
    });

    test('maneja números', () => {
      const { result } = renderHook(() => useLocalStorage('numberKey', 0));
      
      act(() => {
        result.current[1](42);
      });
      
      expect(result.current[0]).toBe(42);
    });

    test('maneja objetos anidados', () => {
      const nestedObject = {
        user: {
          profile: {
            name: 'Test',
            settings: {
              theme: 'dark'
            }
          }
        }
      };
      
      const { result } = renderHook(() => useLocalStorage('nestedKey', {}));
      
      act(() => {
        result.current[1](nestedObject);
      });
      
      expect(result.current[0]).toEqual(nestedObject);
    });
  });
});
