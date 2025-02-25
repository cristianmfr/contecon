import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'
import { CostCenter } from './cost-center.entity'

@ObjectType()
export class CostCenterGroup extends BaseEntity {
    @Field(() => String, { description: 'Name of the cost center' })
    name: string

    @Field(() => String, {
        description: 'Description of the cost center group',
        nullable: true,
    })
    description?: string

    @Field(() => [CostCenter], {
        description: 'Cost centers on the group',
        nullable: true,
    })
    costCenter?: CostCenter[]
}
