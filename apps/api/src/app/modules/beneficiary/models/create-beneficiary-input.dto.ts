import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateBeneficiaryInput {
    @Field(() => String, { description: 'Name of the beneficiary' })
    name: string

    @Field(() => String, {
        description: 'Description of the beneficiary',
        nullable: true,
    })
    description: string

    @Field(() => String, {
        description: 'Document of the beneficiary',
        nullable: true,
    })
    document: string

    @Field(() => String, {
        description: 'Document type of the beneficiary',
        nullable: true,
    })
    documentType: string

    @Field(() => String, {
        description: 'Type of the beneficiary',
        nullable: true,
    })
    type: string

    @Field(() => String, {
        description: 'Email of the beneficiary',
        nullable: true,
    })
    email: string

    @Field(() => String, {
        description: 'Birthdate of the beneficiary',
        nullable: true,
    })
    birthDate: string

    @Field(() => String, {
        description: 'Phone of the beneficiary',
        nullable: true,
    })
    phone: string

    @Field(() => String, {
        description: 'Cellphone of the beneficiary',
        nullable: true,
    })
    cellphone: string

    @Field(() => ID, {
        description: 'Category of the beneficiary',
        nullable: true,
    })
    categoryId?: string

    @Field(() => ID, {
        description: 'Cost center of the beneficiary',
        nullable: true,
    })
    costCenterId?: string
}
