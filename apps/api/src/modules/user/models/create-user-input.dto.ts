import { Field, InputType } from '@nestjs/graphql'
import { BaseEntity } from 'src/common/entities/base.entity'

@InputType()
export class CreateUserInput extends BaseEntity {
    @Field(() => String, { description: 'User name' })
    name: string

    @Field(() => String, { description: 'User email' })
    email: string

    @Field(() => String, { description: 'User password' })
    password: string
}
