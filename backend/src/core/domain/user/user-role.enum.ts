/**
 * User roles in the system
 * Define different access levels and permissions
 */
export enum UserRole {
  ADMIN = 'ADMIN',               // Full system access
  DENTIST = 'DENTIST',           // Medical professionals
  RECEPTIONIST = 'RECEPTIONIST', // Front desk staff
  PATIENT = 'PATIENT',           // Regular patients
}
