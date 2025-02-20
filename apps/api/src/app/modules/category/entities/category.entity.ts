import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'

@ObjectType()
export class Category extends BaseEntity {
    @Field(() => String, { description: 'Name of the category' })
    name: string

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    description?: string

    @Field(() => Number, { description: 'Sequence number of the category' })
    order: number

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    flowClass?: string

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    dreClass?: string

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    type?: string

    @Field(() => Boolean, { description: 'Description of the category' })
    deductible: boolean
}
