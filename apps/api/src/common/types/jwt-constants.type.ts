export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'secretKey',
    secretApp: process.env.SECRET_APP_KEY || 'secretAppKey',
}
