import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'
import { Category } from '../../category/entities/category.entity'
import { CostCenter } from '../../cost-center/entities/cost-center.entity'

@ObjectType()
export class Beneficiary extends BaseEntity {
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

    @Field(() => [Category], {
        description: 'Category of the beneficiary',
        nullable: true,
    })
    category?: Category[]

    @Field(() => [CostCenter], {
        description: 'Cost center of the beneficiary',
        nullable: true,
    })
    costCenter?: CostCenter[]
}
