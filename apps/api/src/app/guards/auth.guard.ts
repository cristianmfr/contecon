import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtSchema } from 'src/common/constants/jwt-schema.constant'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()

    const token =
      ctx.req.headers?.authorization ||
      ctx.req.connectionParams?.headers?.authorization ||
      ctx.req.connectionParams?.Authorization
    const appToken = ctx.req.connectionParams ? ctx.req.connectionParams.apptoken : ctx.req.headers.apptoken

    if (!token && !appToken) {
      throw new UnauthorizedException()
    }

    if (appToken && !token) {
      try {
        const payload = await this.jwtService.verifyAsync(appToken, {
          secret: jwtSchema.secretApp,
        })
        ctx.display = payload
        return true
      } catch {
        throw new UnauthorizedException()
      }
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSchema.secret,
      })
      ctx.user = payload

      return true
    } catch {
      throw new UnauthorizedException()
    }
  }
}
