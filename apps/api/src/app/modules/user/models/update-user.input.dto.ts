import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user-input.dto'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string
}
