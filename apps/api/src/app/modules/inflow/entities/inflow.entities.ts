import { Field, ObjectType, Float } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'
import { Category } from '../../category/entities/category.entity'
import { CostCenter } from '../../cost-center/entities/cost-center.entity'
import { Beneficiary } from '../../beneficiary/entities/beneficiary.entity'
import { FinancialAccount } from '../../financial-account/entities/financial-account.entity'
import { InflowType } from '@prisma/client'

@ObjectType()
export class Inflow extends BaseEntity {
    @Field(() => InflowType, { description: 'Type of the inflow' })
    type: InflowType

    @Field(() => String, { description: 'Name of the inflow' })
    name: string

    @Field(() => String, {
        description: 'Description of the inflow',
        nullable: true,
    })
    description?: string

    @Field(() => Float, { description: 'Value of the inflow' })
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

    @Field(() => FinancialAccount, {
        description: 'Financial account associated with the inflow',
        nullable: true,
    })
    financialAccount?: FinancialAccount

    @Field(() => CostCenter, {
        description: 'Cost center associated with the inflow',
        nullable: true,
    })
    costCenter?: CostCenter

    @Field(() => Category, {
        description: 'Category of the inflow',
        nullable: true,
    })
    category?: Category

    @Field(() => Beneficiary, {
        description: 'Beneficiary associated with the inflow',
        nullable: true,
    })
    beneficiary?: Beneficiary
}
