import { 
  IsString, 
  IsEmail, 
  IsOptional, 
  Length, 
  Matches,
  IsDateString,
  IsArray,
  MaxLength,
  IsBoolean
} from 'class-validator';

/**
 * DTO para actualizar un paciente existente
 * 
 * Todos los campos son opcionales (PATCH).
 * Solo se actualizan los campos proporcionados.
 */
export class UpdatePatientDTO {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo debe contener letras' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser texto' })
  @Length(2, 100, { message: 'El apellido debe tener entre 2 y 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo debe contener letras' })
  apellido?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @Matches(/^[0-9+\-\s()]+$/, { message: 'El teléfono solo debe contener números y símbolos válidos' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  telefono?: string | null;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe tener formato ISO válido (YYYY-MM-DD)' })
  fechaNacimiento?: string;

  @IsOptional()
  @IsString({ message: 'La firma digital debe ser texto' })
  firmaDigital?: string;

  @IsOptional()
  @IsString({ message: 'El odontograma debe ser texto' })
  odontograma?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del apoderado debe ser texto' })
  @Length(2, 100, { message: 'El nombre del apoderado debe tener entre 2 y 100 caracteres' })
  nombreApoderado?: string | null;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(255, { message: 'La dirección no puede exceder 255 caracteres' })
  direccion?: string | null;

  @IsOptional()
  @IsArray({ message: 'Las observaciones deben ser un array' })
  @IsString({ each: true, message: 'Cada observación debe ser texto' })
  observaciones?: string[];

  @IsOptional()
  @IsBoolean({ message: 'estaActivo debe ser un valor booleano' })
  estaActivo?: boolean;
}

