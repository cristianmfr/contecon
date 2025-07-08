import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateEntryInput } from './create-entry-input.dto'

@InputType()
export class UpdateEntryInput extends PartialType(CreateEntryInput) {
  @Field(() => ID)
  id: string
}
