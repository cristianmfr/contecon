import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { UserModule } from '../modules/user/user.module'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { jwtConstants } from 'src/shared/constants/jwt.const'

@Module({
    imports: [
        UserModule,
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
        }),
    ],
    providers: [AuthResolver, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
