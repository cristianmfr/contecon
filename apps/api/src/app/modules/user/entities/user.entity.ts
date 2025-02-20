import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'

@ObjectType()
export class User extends BaseEntity {
    @Field(() => String, { description: 'Email of the user' })
    email: string

    @Field(() => String, { description: 'Name of the user' })
    name: string
}
