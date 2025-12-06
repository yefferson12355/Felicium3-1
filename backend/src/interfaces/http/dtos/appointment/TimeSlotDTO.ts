import { 
  IsNotEmpty, 
  IsString,
  Matches,
  IsDateString
} from 'class-validator';

/**
 * DTO para representar un horario de cita
 * 
 * Valida:
 * - date: formato ISO (YYYY-MM-DD)
 * - startTime: formato HH:MM (24h)
 * - endTime: formato HH:MM (24h)
 */
export class TimeSlotDTO {
  @IsDateString({}, { message: 'La fecha debe tener formato ISO válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha es requerida' })
  date!: string;

  @IsString({ message: 'La hora de inicio debe ser texto' })
  @IsNotEmpty({ message: 'La hora de inicio es requerida' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'La hora de inicio debe tener formato HH:MM (24 horas)' 
  })
  startTime!: string;

  @IsString({ message: 'La hora de fin debe ser texto' })
  @IsNotEmpty({ message: 'La hora de fin es requerida' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'La hora de fin debe tener formato HH:MM (24 horas)' 
  })
  endTime!: string;
}

