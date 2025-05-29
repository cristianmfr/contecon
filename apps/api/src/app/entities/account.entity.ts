import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { AccountType } from '@contecon/database/generated/prisma'

registerEnumType(AccountType, { name: 'AccountType' })

@ObjectType()
export class Account extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  bank?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  number?: string

  @Field(() => String, { nullable: true })
  agency?: string

  @Field(() => AccountType)
  type: AccountType

  @Field(() => Float)
  balance: number

  @Field(() => Float)
  credit: number
}
