import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/common/entities/base.entity'

@ObjectType()
export class User extends BaseEntity {
    @Field(() => String, { description: 'User name' })
    name: string

    @Field(() => String, { description: 'User email' })
    email: string
}
