import { ScheduleType } from '@contecon/database/generated/prisma'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateScheduleInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => String, { nullable: true })
  identifierColor?: string

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

  @Field(() => Number, { nullable: true })
  reminderDaysBefore?: number
}
