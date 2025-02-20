import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { Auth } from './auth.response'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => Auth)
    async signIn(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string
    ) {
        return await this.authService.signIn(email, password)
    }
}
