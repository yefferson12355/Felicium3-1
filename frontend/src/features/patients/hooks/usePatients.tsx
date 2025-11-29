import { useState, useCallback, useEffect } from 'react';
import { patientService } from '../../../core/services/api/patientService';

/**
 * Custom Hook: usePatients
 * 
 * ✅ ACTUALIZADO: Ahora conecta con API real del backend
 * Maneja el estado y las operaciones de pacientes
 */

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPatients = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            console.log('👥 usePatients: Fetching patients from backend...');
            const response = await patientService.getAll();
            
            // Backend returns direct array: [{id, dni, nombre...}, ...]
            const data = Array.isArray(response) ? response : (response.patients || []);
            console.log('✅ usePatients: Patients loaded:', data.length, 'items');
            
            setPatients(data);
            return data;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Error cargando pacientes';
            setError(errorMsg);
            console.error('❌ Error fetching patients:', err);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const createPatient = useCallback(async (patientData) => {
        setLoading(true);
        setError(null);
        try {
            console.log('👥 usePatients: Creating patient...');
            const response = await patientService.createPatient(patientData);
            console.log('✅ usePatients: Patient created:', response);
            
            setPatients(prev => [...prev, response]);
            return { success: true, data: response };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Error creando paciente';
            setError(errorMsg);
            console.error('❌ Error creating patient:', err);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePatient = useCallback(async (id, patientData) => {
        setLoading(true);
        setError(null);
        try {
            console.log(`👥 usePatients: Updating patient ${id}...`);
            const response = await patientService.updatePatient(id, patientData);
            console.log('✅ usePatients: Patient updated:', response);
            
            setPatients(prev => prev.map(p => p.id === id ? response : p));
            return { success: true, data: response };
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || 'Error actualizando paciente';
            setError(errorMsg);
            console.error('❌ Error updating patient:', err);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return {
        patients,
        loading,
        error,
        fetchPatients,
        createPatient,
        updatePatient,
    };
};

export default usePatients;
