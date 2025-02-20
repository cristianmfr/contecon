import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateFinancialAccountInput {
    @Field(() => String, { description: 'Name of the financial account' })
    name: string

    @Field(() => String, {
        description: 'Description of the financial account',
        nullable: true,
    })
    description?: string

    @Field(() => String, {
        description: 'Bank of the financial account',
        nullable: true,
    })
    bank?: string

    @Field(() => String, {
        description: 'Agency number of the financial account',
        nullable: true,
    })
    agency?: string

    @Field(() => String, {
        description: 'Account number',
        nullable: true,
    })
    number?: string

    @Field(() => Number, {
        description: 'Initial balance of the account',
        defaultValue: 0,
    })
    initialBalance: number

    @Field(() => Number, {
        description: 'Initial credit amount',
        defaultValue: 0,
    })
    initialCredit: number

    @Field(() => Number, {
        description: 'Credit limit of the account',
        defaultValue: 0,
    })
    creditLimit: number

    @Field(() => Boolean, {
        description: 'Whether the account is deductible',
        defaultValue: false,
    })
    deductible: boolean

    @Field(() => String, {
        description: 'Wallet information',
        nullable: true,
    })
    wallet?: string

    @Field(() => String, {
        description: 'Variation information',
        nullable: true,
    })
    variation?: string

    @Field(() => String, {
        description: 'Agreement information',
        nullable: true,
    })
    agreement?: string

    @Field(() => Number, {
        description: 'Emission cost',
        defaultValue: 0,
    })
    emissionCost: number

    @Field(() => Number, {
        description: 'Emission tax',
        defaultValue: 0,
    })
    emissionTax: number

    @Field(() => Number, {
        description: 'Monthly cost',
        defaultValue: 0,
    })
    monthlyCost: number
}
