import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateFinancialAccountInput } from './create-financial-account-input.dto'

@InputType()
export class UpdateFinancialAccountInput extends PartialType(
    CreateFinancialAccountInput
) {
    @Field(() => String, { description: 'ID of the financial account' })
    id: string
}
