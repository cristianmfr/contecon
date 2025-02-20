import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCostCenterGroupInput {
    @Field(() => String, { description: 'Name of the cost center' })
    name: string

    @Field(() => String, {
        description: 'Description of the cost center group',
        nullable: true,
    })
    description?: string
}
