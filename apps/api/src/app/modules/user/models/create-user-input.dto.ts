import { Field, InputType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'

@InputType()
export class CreateUserInput extends BaseEntity {
    @Field(() => String, { description: 'Email of the user' })
    email: string

    @Field(() => String, { description: 'Name of the user' })
    name: string

    @Field(() => String, { description: 'Password of the user' })
    password: string
}
