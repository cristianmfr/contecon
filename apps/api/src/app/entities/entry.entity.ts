import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { EntryStatus, EntryType } from '@contecon/database/generated/prisma'
import { Category } from './category.entity'
import { Center } from './center.entity'
import { Beneficiary } from './beneficiary.entity'
import { Account } from './account.entity'

registerEnumType(EntryStatus, { name: 'EntryStatus' })
registerEnumType(EntryType, { name: 'EntryType' })

@ObjectType()
export class Entry extends BaseEntity {
  @Field(() => String)
  receiveFrom: string

  @Field(() => String)
  type: string

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

  @Field(() => Category, { nullable: true })
  category?: Category

  @Field(() => Center, { nullable: true })
  center?: Center

  @Field(() => Beneficiary, { nullable: true })
  beneficiary?: Beneficiary

  @Field(() => Account, { nullable: true })
  account?: Account
}
