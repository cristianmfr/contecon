import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user-input.dto'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => String, { description: 'Unique ID of the user' })
    id: string
}
