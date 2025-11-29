import { useState, useCallback } from 'react';
import { medicalService } from '../services';

export const useMedicalRecords = (patientId) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecords = useCallback(async () => {
        if (!patientId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await medicalService.getByPatient(patientId);
            setRecords(data);
            return data;
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [patientId]);

    const createRecord = useCallback(async (recordData) => {
        setLoading(true);
        setError(null);
        try {
            const newRecord = await medicalService.create(recordData);
            setRecords(prev => [...prev, newRecord]);
            return { success: true, data: newRecord };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        records,
        loading,
        error,
        fetchRecords,
        createRecord,
    };
};

export default useMedicalRecords;
