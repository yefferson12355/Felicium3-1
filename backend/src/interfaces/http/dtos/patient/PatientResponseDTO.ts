//  // DTO de respuesta para el ADMINISTRADOR
export interface PatientAdminResponseDTO {
    //el admin debe tener acceso a todos los campos
	id: string;
	dni: string;
	nombre: string;
	apellido: string;
	email: string;
	fechaNacimiento: string;
	telefono?: string | null;
	direccion?: string | null;
	observaciones?: string[];
	firmaDigital?: string;
	odontograma?: any;
	nombreApoderado?: string | null;
	estaActivo: boolean;
	fechaCreacion: string;
    fechaActualizacion: string; //talvez no sea necesario

}

// DTO de respuesta para el DOCTOR
export interface PatientDoctorResponseDTO {
	id: string;
	dni: string;
	nombre: string;
	apellido: string;
	email: string;
	fechaNacimiento: string;
	telefono?: string | null;
	direccion?: string | null;
	observaciones?: string[];
	odontograma?: any;
	firmaDigital?: string;
}

// DTO de respuesta para la RECEPCIONISTA
export interface PatientReceptionistResponseDTO {
	id: string;
	dni: string;
	nombre: string;
	apellido: string;
	email: string;
	fechaNacimiento: string;
	telefono?: string | null;
	direccion?: string | null;
	nombreApoderado?: string | null;
    observaciones?: string[];
    firmaDigital?: string;
}

// DTO de respuesta para el PACIENTE
export interface PatientSelfResponseDTO {
	id: string;
	dni: string;
	nombre: string;
	apellido: string;
	email: string;
	fechaNacimiento: string;
	telefono?: string | null;
	direccion?: string | null;
	observaciones?: string[];
}

