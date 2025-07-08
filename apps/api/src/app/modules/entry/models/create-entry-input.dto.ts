import { Field, Float, ID, InputType } from '@nestjs/graphql'
import { EntryStatus, EntryType } from '@contecon/database/generated/prisma'

@InputType()
export class CreateEntryInput {
  @Field(() => String)
  receiveFrom: string

  @Field(() => EntryType)
  type: EntryType

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float)
  totalValue: number

  @Field(() => Date, { nullable: true })
  dueDate?: Date

  @Field(() => Date, { nullable: true })
  paymentDate?: Date

  @Field(() => Date, { nullable: true })
  offsetDate?: Date

  @Field(() => EntryStatus)
  status: EntryStatus

  @Field(() => ID, { nullable: true })
  centerId?: string

  @Field(() => ID, { nullable: true })
  categoryId?: string

  @Field(() => ID, { nullable: true })
  accountId?: string

  @Field(() => ID, { nullable: true })
  beneficiaryId?: string
}
