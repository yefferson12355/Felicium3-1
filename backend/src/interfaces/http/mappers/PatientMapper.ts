import { Paciente } from '../../../core/domain/patient/patient.entity';
// Importamos TUS interfaces (asegúrate que el nombre del archivo coincida, ej: PatientResponse.dto)
import { 
  PatientAdminResponseDTO, 
  PatientDoctorResponseDTO, 
  PatientReceptionistResponseDTO,
  PatientSelfResponseDTO 
} from '../dtos/patient/PatientResponseDTO'; // <-- Ajusta si tu archivo se llama diferente

export class PatientMapper {

  /**
   * Mapper para ADMINISTRADORES (Ven todo)
   */
  public static toAdmin(patient: Paciente): PatientAdminResponseDTO {
    return {
      id: patient.id!, // El ! asegura que no es null (ya viene de BD)
      dni: patient.dni,
      nombre: patient.nombre,
      apellido: patient.apellido,
      email: patient.email,
      // Convertimos Date a String para el JSON
      fechaNacimiento: patient.fechaNacimiento.toISOString().split('T')[0], 
      telefono: patient.telefono,
      direccion: patient.direccion,
      observaciones: patient.observaciones,
      firmaDigital: patient.firmaDigital,
      odontograma: patient.odontograma,
      nombreApoderado: patient.nombreApoderado,
      estaActivo: patient.estaActivo,
      fechaCreacion: patient.fechaCreacion.toISOString(),
      fechaActualizacion: new Date().toISOString() // O la fecha real si la tuvieras
    };
  }

  /**
   * Mapper para DOCTORES (Ven datos clínicos)
   */
  public static toDoctor(patient: Paciente): PatientDoctorResponseDTO {
    return {
      id: patient.id!,
      dni: patient.dni,
      nombre: patient.nombre,
      apellido: patient.apellido,
      email: patient.email,
      fechaNacimiento: patient.fechaNacimiento.toISOString().split('T')[0],
      telefono: patient.telefono,
      direccion: patient.direccion,
      observaciones: patient.observaciones,
      odontograma: patient.odontograma,
      firmaDigital: patient.firmaDigital
    };
  }

  /**
   * Mapper para RECEPCIONISTAS (Ven datos administrativos, NO clínicos)
   */
  public static toReceptionist(patient: Paciente): PatientReceptionistResponseDTO {
    return {
      id: patient.id!,
      dni: patient.dni,
      nombre: patient.nombre,
      apellido: patient.apellido,
      email: patient.email,
      fechaNacimiento: patient.fechaNacimiento.toISOString().split('T')[0],
      telefono: patient.telefono,
      direccion: patient.direccion,
      nombreApoderado: patient.nombreApoderado,
      // Aunque tu DTO de recepcionista tiene observaciones y firma, 
      // aquí decides si se las pasas o null/array vacío si son privadas.
      observaciones: patient.observaciones, 
      firmaDigital: patient.firmaDigital
    };
  }

  /**
   * Selector automático según el Rol
   */
  public static toDTO(patient: Paciente, role: string): any {
    switch (role) {
      case 'ADMIN': 
        return this.toAdmin(patient);
      case 'DOCTOR': 
        return this.toDoctor(patient);
      case 'RECEPTIONIST': 
        return this.toReceptionist(patient);
      default: 
        // Por defecto devolvemos la vista de recepcionista o una básica
        return this.toReceptionist(patient);
    }
  }
}