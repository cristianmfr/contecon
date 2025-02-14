import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignInPayload {
    @Field(() => String, { description: 'User e-mail' })
    email: string

    @Field(() => String, { description: 'User password' })
    normalizedPassword: string
}
