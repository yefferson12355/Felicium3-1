/**
 * RegisterDTO - Input for user registration
 */
export class RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role?: string
  ) {
    this.email = email.toLowerCase();
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role || 'PATIENT';
  }
}
