import { 
  IsEmail, 
  IsNotEmpty, 
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum
} from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * Roles permitidos en el sistema
 */
export enum UserRoleDTO {
  ADMIN = 'ADMIN',
  DENTIST = 'DENTIST',
  RECEPTIONIST = 'RECEPTIONIST',
  PATIENT = 'PATIENT'
}

/**
 * DTO para registro de usuario
 * 
 * Valida:
 * - Email: formato válido
 * - Password: mínimo 8 caracteres, debe contener mayúscula, minúscula y número
 * - Nombres: solo letras, longitud entre 2 y 100
 * - Role: debe ser uno de los roles válidos
 */
export class RegisterDTO {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
  })
  password!: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo debe contener letras' })
  @Transform(({ value }) => value?.trim())
  firstName!: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo debe contener letras' })
  @Transform(({ value }) => value?.trim())
  lastName!: string;

  @IsOptional()
  @IsEnum(UserRoleDTO, { message: 'El rol debe ser: ADMIN, DENTIST, RECEPTIONIST o PATIENT' })
  role?: UserRoleDTO;
}

