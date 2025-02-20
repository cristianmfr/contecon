import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from 'src/shared/entities/base.entity'
import { CostCenterGroup } from './cost-center-group.entity'

@ObjectType()
export class CostCenter extends BaseEntity {
    @Field(() => String, { description: 'Name of the cost center' })
    name: string

    @Field(() => String, {
        description: 'Description of the cost center',
        nullable: true,
    })
    description?: string

    @Field(() => Number, { description: 'Sequence number of the cost center' })
    order: number

    @Field(() => CostCenterGroup, { description: 'Group of the cost center' })
    group: CostCenterGroup
}
