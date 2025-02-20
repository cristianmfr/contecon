import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCostCenterInput {
    @Field(() => String, { description: 'Name of the cost center' })
    name: string

    @Field(() => String, {
        description: 'Description of the cost center',
        nullable: true,
    })
    description?: string

    @Field(() => ID, { description: 'ID of the cost center group' })
    groupId: string
}
