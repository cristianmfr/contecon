import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateCategoryInput } from './create-category-input.dto'

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
    @Field(() => ID, { description: 'ID of the category' })
    id: string
}
