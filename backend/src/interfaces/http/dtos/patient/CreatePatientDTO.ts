import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  Length, 
  Matches,
  IsDateString,
  IsArray,
  MaxLength
} from 'class-validator';

/**
 * DTO para crear un nuevo paciente
 * 
 * Incluye validaciones para:
 * - DNI: exactamente 8 dígitos
 * - Email: formato válido
 * - Nombres: longitud mínima y máxima
 * - Fecha de nacimiento: formato ISO válido
 * - Teléfono: formato numérico opcional
 * 
 * Nota: El operador ! indica que las propiedades serán asignadas por class-transformer
 */
export class CreatePatientDTO {
  @IsString({ message: 'El DNI debe ser texto' })
  @IsNotEmpty({ message: 'El DNI es requerido' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'El DNI solo debe contener números' })
  dni!: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo debe contener letras' })
  nombre!: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @Length(2, 100, { message: 'El apellido debe tener entre 2 y 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo debe contener letras' })
  apellido!: string;

  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  email!: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe tener formato ISO válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  fechaNacimiento!: string;

  @IsString({ message: 'La firma digital debe ser texto' })
  @IsNotEmpty({ message: 'La firma digital es requerida' })
  firmaDigital!: string;

  @IsOptional()
  @IsString({ message: 'El odontograma debe ser texto' })
  odontograma?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @Matches(/^[0-9+\-\s()]+$/, { message: 'El teléfono solo debe contener números y símbolos válidos (+, -, espacios, paréntesis)' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del apoderado debe ser texto' })
  @Length(2, 100, { message: 'El nombre del apoderado debe tener entre 2 y 100 caracteres' })
  nombreApoderado?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(255, { message: 'La dirección no puede exceder 255 caracteres' })
  direccion?: string;

  @IsOptional()
  @IsArray({ message: 'Las observaciones deben ser un array' })
  @IsString({ each: true, message: 'Cada observación debe ser texto' })
  observaciones?: string[];
}
