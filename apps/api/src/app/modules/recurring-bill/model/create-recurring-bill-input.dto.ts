import { Field, Float, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRecurringBillInput {
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

  @Field(() => ID, { nullable: true })
  categoryId?: string

  @Field(() => ID, { nullable: true })
  centerId?: string
}
