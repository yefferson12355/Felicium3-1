/**
 * Superficies de un diente
 * Un diente tiene 5 superficies. Este enum las define
 */
export enum ToothSurface {
  // Superficie de masticación (arriba)
  OCCLUSAL = 'OCLUSAL',           // Superficie de masticación (solo en molares y premolares)

  // Superficies de caras laterales
  MESIAL = 'MESIAL',              // Superficie hacia la línea media (hacia adelante)
  DISTAL = 'DISTAL',              // Superficie alejada de la línea media (hacia atrás)

  // Superficies vestibulares (hacia afuera)
  BUCCAL = 'BUCAL',               // Superficie hacia las mejillas (posteriores)
  LABIAL = 'LABIAL',              // Superficie hacia los labios (anteriores)

  // Superficie hacia la lengua
  LINGUAL = 'LINGUAL',            // Superficie hacia la lengua (superficie interna)
  PALATAL = 'PALATINA',           // Superficie hacia el paladar (solo en dientes superiores)
}
