"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMapper = void 0;
class PatientMapper {
    /**
     * Mapper para ADMINISTRADORES (Ven todo)
     */
    static toAdmin(patient) {
        return {
            id: patient.id, // El ! asegura que no es null (ya viene de BD)
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
    static toDoctor(patient) {
        return {
            id: patient.id,
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
    static toReceptionist(patient) {
        return {
            id: patient.id,
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
    static toDTO(patient, role) {
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
exports.PatientMapper = PatientMapper;
