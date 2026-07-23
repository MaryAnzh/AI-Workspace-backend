export const ROUTES = {
  HEALTH: 'health',
  SWAGGER: 'api/docs',
  AUTH: 'auth',
  REGISTER: 'register',
  LOGIN: 'login',
  USER: 'user',
  AVATAR: 'avatar',
  UPLOADS: 'uploads',
} as const;
export const { AUTH, REGISTER, LOGIN, USER, AVATAR } = ROUTES;

export const ROUTES_FULL_PATH = {
  REGISTER: `${AUTH}/${REGISTER}`,
  LOGIN: `${AUTH}/${LOGIN}`,
};
export const IS_PUBLIC_KEY = 'isPublic';
