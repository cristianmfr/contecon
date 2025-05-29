import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateRecurringBillInput } from './create-recurring-bill-input.dto'

@InputType()
export class UpdateRecurringBillInput extends PartialType(CreateRecurringBillInput) {
  @Field(() => ID)
  id: string
}
