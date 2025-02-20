import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateCostCenterInput } from './create-cost-center-input.dto'

@InputType()
export class UpdateCostCenterInput extends PartialType(CreateCostCenterInput) {
    @Field(() => ID, { description: 'ID of the cost center' })
    id: string
}
