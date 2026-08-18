import { User } from '@prisma/client';

export type UserType = User;
export type UserTokenType = Pick<UserType, 'id' | 'email'>;
export type UserSafe = Omit<UserType, 'passwordHash' | 'updatedAt'>;

export type UserUpdateType = Partial<Pick<UserType, 'name'>>;
export type UserUpdatePasswordType = {
  oldPassword: string;
  newPassword: string;
};

export interface RequestWithUser extends Request {
  user: UserTokenType;
}
