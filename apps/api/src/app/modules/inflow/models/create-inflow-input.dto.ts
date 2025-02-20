import { Field, ID, registerEnumType, InputType } from '@nestjs/graphql'
import { InflowType } from '@prisma/client'

registerEnumType(InflowType, { name: 'InflowType' })

@InputType()
export class CreateInflowInput {
    @Field(() => InflowType, { description: 'Type of the inflow' })
    type: InflowType

    @Field(() => String, { description: 'Name of the inflow' })
    name: string

    @Field(() => String, {
        description: 'Description of the inflow',
        nullable: true,
    })
    description?: string

    @Field(() => Number, { description: 'Value of the inflow' })
    value: number

    @Field(() => String, {
        description: 'Compensation information',
        nullable: true,
    })
    compensation?: string

    @Field(() => Date, {
        description: 'Due date of the inflow',
        nullable: true,
    })
    dueDate?: Date

    @Field(() => Boolean, {
        description: 'Whether the inflow has been received',
        defaultValue: false,
    })
    received: boolean

    @Field(() => ID, {
        description: 'Financial account associated with the inflow',
        nullable: true,
    })
    financialAccountId?: string

    @Field(() => ID, {
        description: 'Cost center associated with the inflow',
        nullable: true,
    })
    costCenterId?: string

    @Field(() => ID, {
        description: 'Category of the inflow',
        nullable: true,
    })
    categoryId?: string

    @Field(() => ID, {
        description: 'Beneficiary associated with the inflow',
        nullable: true,
    })
    beneficiaryId?: string
}
