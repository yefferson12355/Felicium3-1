"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdontogramController = void 0;
const OdontogramMapper_1 = require("../mappers/OdontogramMapper");
/**
 * OdontogramController
 *
 * Controlador que maneja todos los endpoints HTTP del odontograma
 *
 * Responsabilidades:
 * - Recibir requests HTTP
 * - Validar datos de entrada
 * - Llamar a use cases
 * - Devolver respuestas formateadas
 *
 * Endpoints:
 * POST   /api/odontogram              - Crear nuevo odontograma
 * GET    /api/odontogram/:id          - Obtener por ID
 * GET    /api/odontogram/patient/:id  - Obtener por paciente
 * PUT    /api/odontogram/:id          - Actualizar estado de diente
 * DELETE /api/odontogram/:id          - Eliminar odontograma
 */
class OdontogramController {
    constructor(createOdontogramUseCase, getOdontogramByIdUseCase, getOdontogramByPatientUseCase, updateOdontogramUseCase, deleteOdontogramUseCase) {
        this.createOdontogramUseCase = createOdontogramUseCase;
        this.getOdontogramByIdUseCase = getOdontogramByIdUseCase;
        this.getOdontogramByPatientUseCase = getOdontogramByPatientUseCase;
        this.updateOdontogramUseCase = updateOdontogramUseCase;
        this.deleteOdontogramUseCase = deleteOdontogramUseCase;
    }
    /**
     * POST /api/odontogram
     * Crear nuevo odontograma para un paciente
     */
    async createOdontogram(req, res) {
        try {
            const dto = req.body;
            // Validación básica
            if (!dto.patientId || !dto.patientAge || !dto.dentureType) {
                res.status(400).json({
                    success: false,
                    error: 'Campos requeridos: patientId, patientAge, dentureType',
                });
                return;
            }
            // Ejecutar use case
            const odontogram = await this.createOdontogramUseCase.execute({
                patientId: dto.patientId,
                patientAge: dto.patientAge,
                dentureType: dto.dentureType,
            });
            // Mapear a DTO y responder
            const responseDto = OdontogramMapper_1.OdontogramMapper.toPersistence(odontogram);
            res.status(201).json({
                success: true,
                data: responseDto,
                message: 'Odontograma creado exitosamente',
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || 'Error al crear odontograma',
            });
        }
    }
    /**
     * GET /api/odontogram/:id
     * Obtener un odontograma por su ID
     */
    async getOdontogramById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'ID del odontograma requerido',
                });
                return;
            }
            // Ejecutar use case
            const odontogram = await this.getOdontogramByIdUseCase.execute(id);
            // Mapear y responder
            const responseDto = OdontogramMapper_1.OdontogramMapper.toPersistence(odontogram);
            res.status(200).json({
                success: true,
                data: responseDto,
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                error: error.message || 'Odontograma no encontrado',
            });
        }
    }
    /**
     * GET /api/odontogram/patient/:patientId
     * Obtener el odontograma de un paciente específico
     */
    async getOdontogramByPatient(req, res) {
        try {
            const { patientId } = req.params;
            if (!patientId) {
                res.status(400).json({
                    success: false,
                    error: 'ID del paciente requerido',
                });
                return;
            }
            // Ejecutar use case
            const odontogram = await this.getOdontogramByPatientUseCase.execute(patientId);
            // Mapear y responder
            const responseDto = OdontogramMapper_1.OdontogramMapper.toPersistence(odontogram);
            res.status(200).json({
                success: true,
                data: responseDto,
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                error: error.message || 'Odontograma del paciente no encontrado',
            });
        }
    }
    /**
     * PUT /api/odontogram/:id
     * Actualizar un diente en el odontograma
     *
     * Body:
     * {
     *   "toothNumber": 11,
     *   "newState": "CARIES",
     *   "notes": "Caries detectada en revisión"
     * }
     */
    async updateOdontogram(req, res) {
        try {
            const { id } = req.params;
            const dto = req.body;
            // Validación
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'ID del odontograma requerido',
                });
                return;
            }
            if (!dto.toothNumber || !dto.newState) {
                res.status(400).json({
                    success: false,
                    error: 'Campos requeridos: toothNumber, newState',
                });
                return;
            }
            // Ejecutar use case
            const updatedOdontogram = await this.updateOdontogramUseCase.execute({
                odontogramId: id,
                toothNumber: dto.toothNumber,
                newState: dto.newState,
                notes: dto.notes,
            });
            // Mapear y responder
            const responseDto = OdontogramMapper_1.OdontogramMapper.toPersistence(updatedOdontogram);
            res.status(200).json({
                success: true,
                data: responseDto,
                message: `Diente ${dto.toothNumber} actualizado a ${dto.newState}`,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message || 'Error al actualizar odontograma',
            });
        }
    }
    /**
     * DELETE /api/odontogram/:id
     * Eliminar un odontograma
     */
    async deleteOdontogram(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    error: 'ID del odontograma requerido',
                });
                return;
            }
            // Ejecutar use case
            await this.deleteOdontogramUseCase.execute(id);
            res.status(200).json({
                success: true,
                message: `Odontograma ${id} eliminado exitosamente`,
            });
        }
        catch (error) {
            res.status(404).json({
                success: false,
                error: error.message || 'Error al eliminar odontograma',
            });
        }
    }
}
exports.OdontogramController = OdontogramController;
