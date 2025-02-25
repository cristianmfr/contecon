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
}
