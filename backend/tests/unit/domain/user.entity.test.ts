import { User } from '../../../src/core/domain/user/user.entity';
import { UserRole } from '../../../src/core/domain/user/user-role.enum';
import { WeakPasswordError } from '../../../src/core/domain/user/auth.errors';

describe('User Entity', () => {
  describe('create()', () => {
    it('should create a new user with hashed password', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      expect(user.getId()).toBe('user-123');
      expect(user.getEmail()).toBe('john@example.com');
      expect(user.getFirstName()).toBe('John');
      expect(user.getLastName()).toBe('Doe');
      expect(user.getRole()).toBe(UserRole.PATIENT);
      expect(user.getIsActive()).toBe(true);
    });

    it('should throw WeakPasswordError if password is too short', async () => {
      await expect(
        User.create('user-123', 'john@example.com', 'Pass1', 'John', 'Doe', UserRole.PATIENT)
      ).rejects.toThrow(WeakPasswordError);
    });

    it('should throw WeakPasswordError if password has no uppercase', async () => {
      await expect(
        User.create('user-123', 'john@example.com', 'password123', 'John', 'Doe', UserRole.PATIENT)
      ).rejects.toThrow(WeakPasswordError);
    });

    it('should throw WeakPasswordError if password has no lowercase', async () => {
      await expect(
        User.create('user-123', 'john@example.com', 'PASSWORD123', 'John', 'Doe', UserRole.PATIENT)
      ).rejects.toThrow(WeakPasswordError);
    });

    it('should throw WeakPasswordError if password has no numbers', async () => {
      await expect(
        User.create('user-123', 'john@example.com', 'PasswordNoNumbers', 'John', 'Doe', UserRole.PATIENT)
      ).rejects.toThrow(WeakPasswordError);
    });
  });

  describe('verifyPassword()', () => {
    it('should verify correct password', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      const isValid = await user.verifyPassword('SecurePass123');
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      const isValid = await user.verifyPassword('WrongPassword123');
      expect(isValid).toBe(false);
    });
  });

  describe('recordLogin()', () => {
    it('should update lastLogin timestamp', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      const beforeLogin = user.getLastLogin();
      user.recordLogin();
      const afterLogin = user.getLastLogin();

      expect(beforeLogin).toBeUndefined();
      expect(afterLogin).toBeDefined();
      expect(afterLogin!.getTime()).toBeGreaterThanOrEqual(new Date().getTime() - 1000);
    });
  });

  describe('deactivate() and activate()', () => {
    it('should deactivate and activate user', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      expect(user.getIsActive()).toBe(true);

      user.deactivate();
      expect(user.getIsActive()).toBe(false);

      user.activate();
      expect(user.getIsActive()).toBe(true);
    });
  });

  describe('hasRole() and role checks', () => {
    it('should correctly check user role', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.DENTIST
      );

      expect(user.hasRole(UserRole.DENTIST)).toBe(true);
      expect(user.hasRole(UserRole.ADMIN)).toBe(false);
      expect(user.isDentist()).toBe(true);
      expect(user.isAdmin()).toBe(false);
    });
  });

  describe('getFullName()', () => {
    it('should return full name', async () => {
      const user = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.PATIENT
      );

      expect(user.getFullName()).toBe('John Doe');
    });
  });

  describe('toJSON() and fromJSON()', () => {
    it('should serialize and deserialize user', async () => {
      const originalUser = await User.create(
        'user-123',
        'john@example.com',
        'SecurePass123',
        'John',
        'Doe',
        UserRole.DENTIST
      );

      const json = originalUser.toJSON();
      const restoredUser = User.fromJSON(json);

      expect(restoredUser.getId()).toBe(originalUser.getId());
      expect(restoredUser.getEmail()).toBe(originalUser.getEmail());
      expect(restoredUser.getFirstName()).toBe(originalUser.getFirstName());
      expect(restoredUser.getRole()).toBe(originalUser.getRole());
    });
  });
});
