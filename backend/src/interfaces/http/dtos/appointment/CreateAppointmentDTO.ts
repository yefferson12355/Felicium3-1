import { 
  IsNotEmpty, 
  IsString,
  IsOptional,
  IsUUID,
  ValidateNested,
  MaxLength,
  MinLength
} from 'class-validator';
import { Type } from 'class-transformer';
import { TimeSlotDTO } from './TimeSlotDTO';

/**
 * DTO para crear una nueva cita
 * 
 * Valida:
 * - patientId: UUID válido
 * - timeSlot: objeto con fecha y horarios válidos
 * - reason: motivo de la cita (requerido)
 * - treatmentType: tipo de tratamiento (opcional)
 * - dentistId: UUID del dentista (opcional)
 */
export class CreateAppointmentDTO {
  @IsString({ message: 'El ID del paciente debe ser texto' })
  @IsNotEmpty({ message: 'El ID del paciente es requerido' })
  @IsUUID('4', { message: 'El ID del paciente debe ser un UUID válido' })
  patientId!: string;

  @ValidateNested({ message: 'El horario debe ser un objeto válido' })
  @Type(() => TimeSlotDTO)
  @IsNotEmpty({ message: 'El horario es requerido' })
  timeSlot!: TimeSlotDTO;

  @IsString({ message: 'El motivo debe ser texto' })
  @IsNotEmpty({ message: 'El motivo de la cita es requerido' })
  @MinLength(5, { message: 'El motivo debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'El motivo no puede exceder 255 caracteres' })
  reason!: string;

  @IsOptional()
  @IsString({ message: 'El tipo de tratamiento debe ser texto' })
  @MaxLength(100, { message: 'El tipo de tratamiento no puede exceder 100 caracteres' })
  treatmentType?: string;

  @IsOptional()
  @IsString({ message: 'El ID del dentista debe ser texto' })
  @IsUUID('4', { message: 'El ID del dentista debe ser un UUID válido' })
  dentistId?: string;
}

