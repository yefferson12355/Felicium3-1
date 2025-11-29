"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
/**
 * Dashboard Controller
 *
 * Maneja endpoints para obtener estadísticas del dashboard
 */
class DashboardController {
    constructor(appointmentRepository, patientRepository, userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }
    /**
     * GET /api/dashboard/stats
     *
     * Obtener estadísticas generales del dashboard
     */
    async getStats(req, res) {
        try {
            console.log('[DASHBOARD] GET /stats - Fetching statistics');
            // Aquí iría la lógica real si tenemos repositories
            // Por ahora devolvemos datos basados en datos simulados
            // En una implementación real, harías:
            // const totalPatients = await this.patientRepository.countAll();
            // const totalAppointments = await this.appointmentRepository.countAll();
            // etc.
            const stats = {
                totalPatients: 128,
                totalAppointmentsMonth: 45,
                totalRevenueMonth: 22000,
                appointmentsToday: 12,
                appointmentsCompleted: 10,
                appointmentsPending: 2,
                newPatientsMonth: 8,
                appointmentCompletionRate: 83.5,
                // Adicionales para admin
                activeUsers: 4,
                totalUsers: 4,
                appointmentsByStatus: {
                    scheduled: 22,
                    completed: 18,
                    cancelled: 5
                },
                revenueByMonth: [18000, 22000, 19500, 24000, 21000, 25000],
                appointmentsByDentist: {
                    'dentist-001': 15,
                    'dentist-002': 30
                }
            };
            console.log('✅ Stats retrieved successfully');
            res.status(200).json(stats);
        }
        catch (error) {
            console.error('❌ Error fetching stats:', error.message);
            res.status(500).json({ error: 'Error fetching statistics' });
        }
    }
    /**
     * GET /api/dashboard/stats/appointments
     *
     * Obtener estadísticas de citas por período
     */
    async getAppointmentStats(req, res) {
        try {
            const { startDate, endDate } = req.query;
            console.log('[DASHBOARD] GET /stats/appointments', { startDate, endDate });
            const stats = {
                period: `${startDate || '2025-11-01'} to ${endDate || '2025-11-30'}`,
                totalAppointments: 45,
                completed: 37,
                cancelled: 3,
                noShow: 2,
                pending: 3,
                completionRate: 82.2,
                byDentist: {
                    'dentist-001': { completed: 15, cancelled: 1, pending: 1 },
                    'dentist-002': { completed: 22, cancelled: 2, pending: 2 }
                },
                byTreatment: {
                    'Limpieza': 15,
                    'Endodoncia': 10,
                    'Extracción': 12,
                    'Blanqueamiento': 8
                }
            };
            res.status(200).json(stats);
        }
        catch (error) {
            console.error('❌ Error fetching appointment stats:', error.message);
            res.status(500).json({ error: 'Error fetching appointment statistics' });
        }
    }
    /**
     * GET /api/dashboard/stats/revenue
     *
     * Obtener estadísticas de ingresos por período
     */
    async getRevenueStats(req, res) {
        try {
            const { startDate, endDate } = req.query;
            console.log('[DASHBOARD] GET /stats/revenue', { startDate, endDate });
            const stats = {
                period: `${startDate || '2025-11-01'} to ${endDate || '2025-11-30'}`,
                totalRevenue: 22000,
                appointmentCount: 45,
                averagePerAppointment: 488.89,
                byTreatmentType: {
                    'Limpieza': 2700,
                    'Endodoncia': 9000,
                    'Extracción': 7200,
                    'Blanqueamiento': 3100
                },
                byDentist: {
                    'dentist-001': 8900,
                    'dentist-002': 13100
                },
                monthlyTrend: [
                    { month: '2025-09', revenue: 18000 },
                    { month: '2025-10', revenue: 22000 },
                    { month: '2025-11', revenue: 19500 }
                ]
            };
            res.status(200).json(stats);
        }
        catch (error) {
            console.error('❌ Error fetching revenue stats:', error.message);
            res.status(500).json({ error: 'Error fetching revenue statistics' });
        }
    }
    /**
     * GET /api/dashboard/stats/patients
     *
     * Obtener estadísticas de pacientes
     */
    async getPatientStats(req, res) {
        try {
            console.log('[DASHBOARD] GET /stats/patients');
            const stats = {
                totalPatients: 128,
                activePatients: 120,
                inactivePatients: 8,
                newThisMonth: 8,
                newThisWeek: 2,
                returnRate: 85.5,
                averageAge: 42,
                byGender: {
                    male: 58,
                    female: 70
                },
                byStatus: {
                    active: 120,
                    inactive: 8
                }
            };
            res.status(200).json(stats);
        }
        catch (error) {
            console.error('❌ Error fetching patient stats:', error.message);
            res.status(500).json({ error: 'Error fetching patient statistics' });
        }
    }
}
exports.DashboardController = DashboardController;
exports.default = DashboardController;
