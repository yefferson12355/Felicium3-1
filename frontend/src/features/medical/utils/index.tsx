export const validateMedicalRecord = (recordData) => {
    const errors = {};

    if (!recordData.patientId) {
        errors.patientId = 'El paciente es requerido';
    }

    if (!recordData.diagnosis || recordData.diagnosis.trim().length < 5) {
        errors.diagnosis = 'El diagnóstico debe tener al menos 5 caracteres';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

export default {
    validateMedicalRecord,
};
