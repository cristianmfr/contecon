import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateBeneficiaryInput } from './create-beneficiary-input.dto'

@InputType()
export class UpdateBeneficiaryInput extends PartialType(CreateBeneficiaryInput) {
  @Field(() => String)
  id: string
}
