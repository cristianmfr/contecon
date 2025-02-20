import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateCategoryGroupInput } from './create-category-group-input.dto'

@InputType()
export class UpdateCategoryGroupInput extends PartialType(
    CreateCategoryGroupInput
) {
    @Field(() => ID, { description: 'ID of the category group' })
    id: string
}
