import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateInflowInput } from './create-inflow-input.dto'

@InputType()
export class UpdateInflowInput extends PartialType(CreateInflowInput) {
    @Field(() => String, { description: 'ID of the inflow' })
    id: string
}
