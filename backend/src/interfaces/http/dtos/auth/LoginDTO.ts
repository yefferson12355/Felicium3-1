/**
 * LoginDTO - Input for user login
 */
export class LoginDTO {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email.toLowerCase();
    this.password = password;
  }
}
