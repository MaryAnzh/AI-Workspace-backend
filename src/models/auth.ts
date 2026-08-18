import { UserSafe } from './user';

export type JwtPayload = {
  /** uuid  */
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
};

export type AuthResponse = {
  accessToken: string;
  user: UserSafe;
};
