import { Field, Float, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { Category } from './category.entity'
import { Center } from './center.entity'

@ObjectType()
export class RecurringBilling extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Float)
  amount: number

  @Field(() => Date)
  startDate: Date

  @Field(() => Date)
  endDate: Date

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => Category)
  category: Category

  @Field(() => Center)
  center: Center
}
