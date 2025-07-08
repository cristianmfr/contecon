export const jwtSchema = {
  secret: process.env.JWT_SECRET || 'secretKey',
  secretApp: process.env.SECRET_APP_KEY || 'secretAppKey',
}
