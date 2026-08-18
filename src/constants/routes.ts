export const ROUTES = {
  HEALTH: 'health',
  SWAGGER: 'api/docs',
  AUTH: 'auth',
  REGISTER: 'register',
  LOGIN: 'login',
  USER: 'user',
  AVATAR: 'avatar',
  UPLOADS: 'uploads',
  CURRENT_USER: 'current-user',
  REFRESH: 'refresh',
} as const;
export const { AUTH, REGISTER, LOGIN, USER, AVATAR } = ROUTES;

export const ROUTES_FULL_PATH = {
  REGISTER: `${AUTH}/${REGISTER}`,
  LOGIN: `${AUTH}/${LOGIN}`,
};
