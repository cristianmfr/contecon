import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateAccountInput } from './create-account-input.dto'

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => ID)
  id: string
}
