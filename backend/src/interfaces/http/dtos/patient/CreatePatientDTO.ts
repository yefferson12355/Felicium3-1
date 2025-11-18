export interface CreatePatientDTO {
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  firmaDigital: string; // <-- ahora es requerido
  odontograma?: any; // Ajusta el tipo según tu dominio
  telefono?: string;
  nombreApoderado?: string;
  direccion?: string;
  observaciones?: string;
}