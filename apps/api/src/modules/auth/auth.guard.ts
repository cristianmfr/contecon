import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common'

import { jwtConstants } from '../../common/types/jwt-constants.type'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: GqlExecutionContext) {
        const requiredPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler()
        )
        const ctx = GqlExecutionContext.create(context).getContext()

        const token =
            ctx.req.headers?.authorization ||
            ctx.req.connectionParams?.headers?.authorization ||
            ctx.req.connectionParams?.Authorization
        const appToken = ctx.req.connectionParams
            ? ctx.req.connectionParams.apptoken
            : ctx.req.headers.apptoken

        if (!token && !appToken) {
            throw new UnauthorizedException()
        }

        if (appToken && !token) {
            try {
                const payload = await this.jwtService.verifyAsync(appToken, {
                    secret: jwtConstants.secretApp,
                })
                ctx.display = payload
                return true
            } catch {
                throw new UnauthorizedException()
            }
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            })
            ctx.user = payload

            if (!requiredPermissions) {
                return true
            }
        } catch {
            throw new UnauthorizedException()
        }
    }
}
