"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAppointmentsUseCase = void 0;
/**
 * ListAppointmentsUseCase - List appointments with filters
 */
class ListAppointmentsUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(filters) {
        return this.appointmentRepository.findAll(filters);
    }
}
exports.ListAppointmentsUseCase = ListAppointmentsUseCase;
