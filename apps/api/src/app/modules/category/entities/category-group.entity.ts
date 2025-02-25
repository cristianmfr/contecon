import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'
import { Category } from './category.entity'

@ObjectType()
export class CategoryGroup extends BaseEntity {
    @Field(() => String, { description: 'Name of the category' })
    name: string

    @Field(() => String, { description: 'Description of the category' })
    description: string

    @Field(() => [Category], {
        description: 'Categories on the group',
        nullable: true,
    })
    categories?: Category[]
}
