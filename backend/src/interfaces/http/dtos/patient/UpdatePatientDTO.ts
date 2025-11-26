export interface UpdatePatientDTO {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string | null;
  fechaNacimiento?: string; // string en formato ISO, se convierte a Date en el caso de uso
  firmaDigital?: string;
  odontograma?: any;
  nombreApoderado?: string | null;
  direccion?: string | null;
}
