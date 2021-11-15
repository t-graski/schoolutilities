export const jwtConstants = {
  secret: process.env.PASSWORD_ENCRYPTION_KEY,
  refreshTokenExpiryTime: '168h',
};
