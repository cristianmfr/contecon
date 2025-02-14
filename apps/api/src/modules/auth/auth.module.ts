import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from 'src/shared/database/prisma/prisma.module'
import { UserModule } from 'src/modules/user/user.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

import { jwtConstants } from '../../common/types/jwt-constants.type'

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
