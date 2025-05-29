import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { Auth } from 'src/app/entities/auth.entity'
import { AuthService } from './auth.service'
import { SignInInput } from './models/sign-in-input.dto'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signIn(@Args('input') input: SignInInput) {
    return await this.authService.signIn(input)
  }
}
