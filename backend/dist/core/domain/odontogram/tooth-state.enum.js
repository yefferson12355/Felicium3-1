"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToothState = void 0;
/**
 * Estados posibles de un diente en el odontograma
 * Define los diferentes estados clínicos que puede tener un diente
 */
var ToothState;
(function (ToothState) {
    // Estado inicial
    ToothState["HEALTHY"] = "SANO";
    // Estados patológicos (problemas)
    ToothState["CARIES"] = "CARIES";
    ToothState["CAVITY"] = "CAVIDAD";
    // Estados de tratamiento
    ToothState["FILLING"] = "OBTURACION";
    ToothState["SEALANT"] = "SELLANTE";
    ToothState["ROOT_CANAL"] = "ENDODONCIA";
    ToothState["CROWN"] = "CORONA";
    ToothState["BRIDGE"] = "PUENTE";
    ToothState["IMPLANT"] = "IMPLANTE";
    // Ausencia
    ToothState["EXTRACTED"] = "EXTRACCION";
    ToothState["MISSING"] = "FALTANTE";
    ToothState["PLANNED_EXTRACTION"] = "EXTRACCION_PLANEADA";
    // Otros estados
    ToothState["IN_TREATMENT"] = "EN_TRATAMIENTO";
    ToothState["NEEDS_ATTENTION"] = "REQUIERE_ATENCION";
})(ToothState || (exports.ToothState = ToothState = {}));
