export const validatePatient = (patientData: any) => {
    const errors: Record<string, string> = {};

    if (!patientData.name || patientData.name.trim().length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!patientData.email) {
        errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientData.email)) {
        errors.email = 'Email inválido';
    }

    if (!patientData.phone) {
        errors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(patientData.phone.replace(/\D/g, ''))) {
        errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

export const filterByStatus = (patients: any[], status: string) => {
    if (!status || status === 'all') return patients;
    return patients.filter(p => p.status === status);
};

export const searchPatients = (patients, searchText) => {
    if (!searchText || searchText.trim() === '') return patients;
    const search = searchText.toLowerCase();
    return patients.filter(p =>
        p.name?.toLowerCase().includes(search) ||
        p.email?.toLowerCase().includes(search) ||
        p.phone?.includes(search)
    );
};

export default {
    validatePatient,
    filterByStatus,
    searchPatients,
};
