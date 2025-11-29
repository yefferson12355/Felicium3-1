"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToothSurface = void 0;
/**
 * Superficies de un diente
 * Un diente tiene 5 superficies. Este enum las define
 */
var ToothSurface;
(function (ToothSurface) {
    // Superficie de masticación (arriba)
    ToothSurface["OCCLUSAL"] = "OCLUSAL";
    // Superficies de caras laterales
    ToothSurface["MESIAL"] = "MESIAL";
    ToothSurface["DISTAL"] = "DISTAL";
    // Superficies vestibulares (hacia afuera)
    ToothSurface["BUCCAL"] = "BUCAL";
    ToothSurface["LABIAL"] = "LABIAL";
    // Superficie hacia la lengua
    ToothSurface["LINGUAL"] = "LINGUAL";
    ToothSurface["PALATAL"] = "PALATINA";
})(ToothSurface || (exports.ToothSurface = ToothSurface = {}));
