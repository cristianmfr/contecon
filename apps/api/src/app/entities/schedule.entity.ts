import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { ScheduleType } from '@contecon/database/generated/prisma'
import { Category } from './category.entity'
import { Center } from './center.entity'

registerEnumType(ScheduleType, { name: 'ScheduleType' })

@ObjectType()
export class Schedule extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => ScheduleType)
  type: ScheduleType

  @Field(() => Date)
  startDate: Date

  @Field(() => Date)
  endDate: Date

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => Boolean)
  reminder: boolean

  @Field(() => Int, { nullable: true })
  reminderDaysBefore?: number

  @Field(() => String, { nullable: true })
  identifierColor?: string
}
