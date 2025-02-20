import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryGroupInput {
    @Field(() => String, { description: 'Name of the category' })
    name: string

    @Field(() => String, {
        description: 'Description of the category',
        nullable: true,
    })
    description?: string
}
