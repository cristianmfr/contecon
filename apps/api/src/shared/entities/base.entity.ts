import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseEntity {
    @Field(() => ID, { description: 'Unique identifier' })
    id: string

    @Field(() => Date, { description: 'Date of creation' })
    createdAt: string

    @Field(() => Date, { description: 'Date of last update' })
    updatedAt: string
}
