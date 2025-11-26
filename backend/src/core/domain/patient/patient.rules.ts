// Exportamos una "clase" que agrupa a todos nuestros guardianes

export class ReglasPaciente {

  /**
   * REGLA: Valida un DNI (Lógica de ejemplo simple)
   * @param dni El string del DNI a validar
   * @returns true si es válido, false si no
   */
  public static validarDNI(dni: string): boolean {
    if (!dni) return false;
    // Lógica simple: asumimos que debe tener 8 caracteres
    // (En un proyecto real, aquí iría una lógica de validación de DNI peruano)
    return dni.trim().length === 8; 
  }

  /**
   * REGLA: Valida un Email
   * @param email El email a validar
   * @returns true si es válido, false si no
   */
  public static validarEmail(email: string): boolean {
    // 1. La "Cláusula de Guardia"
    if (!email) return false;
    // Esta es una "expresión regular" (regex) estándar para emails
    // 2. La "Fórmula Mágica" (Regex)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3. El "Veredicto"
    return regex.test(email);
 

    
  }

  /**
   * REGLA: Valida texto requerido (para Nombre, Apellido)
   * @param texto El texto a validar
   * @returns true si tiene al menos 2 caracteres, false si no
   */
  public static validarTextoRequerido(texto: string): boolean {
    if (!texto) return false;
    return texto.trim().length >= 2;
  }

  // Aquí podrías añadir más reglas:
  // public static validarTelefono(telefono: string): boolean { ... }
}