import { 
  IsEmail, 
  IsNotEmpty, 
  IsString,
  MinLength 
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO para login de usuario
 * 
 * Valida:
 * - Email: formato válido y en minúsculas
 * - Password: mínimo 8 caracteres
 */
export class LoginDTO {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password!: string;
}

