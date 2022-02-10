export const jwt = {
  secret: String(process.env.APP_SECRET),
  expiresIn: String(process.env.EXPIRES_IN),
};
