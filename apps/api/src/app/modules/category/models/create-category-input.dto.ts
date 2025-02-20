import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
    @Field(() => String, { description: 'Name of the category' })
    name: string

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    description?: string

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

    // @Field(() => ID, { description: 'Name of the category' })
    // groupId: string
}
