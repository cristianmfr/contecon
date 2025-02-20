import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateCostCenterGroupInput } from './create-cost-center-group-input.dto'

@InputType()
export class UpdateCostCenterGroupInput extends PartialType(
    CreateCostCenterGroupInput
) {
    @Field(() => ID, { description: 'ID of the cost center group' })
    id: string
}
