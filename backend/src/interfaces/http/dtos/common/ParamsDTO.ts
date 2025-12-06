import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

/**
 * DTO para validar parámetros de ID en rutas
 * 
 * Usado para validar :id en rutas como GET /patients/:id
 */
export class IdParamDTO {
  @IsString({ message: 'El ID debe ser texto' })
  @IsNotEmpty({ message: 'El ID es requerido' })
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  id!: string;
}

/**
 * DTO para validar parámetros de DNI en rutas
 */
export class DniParamDTO {
  @IsString({ message: 'El DNI debe ser texto' })
  @IsNotEmpty({ message: 'El DNI es requerido' })
  dni!: string;
}
