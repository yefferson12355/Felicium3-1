import { UserRole } from '../../../../core/domain/user/user-role.enum';

/**
 * UserResponseDTO - User data for response (without password)
 */
export class UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastLogin?: Date
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt.toISOString();
    this.updatedAt = updatedAt.toISOString();
    this.lastLogin = lastLogin?.toISOString();
  }
}
