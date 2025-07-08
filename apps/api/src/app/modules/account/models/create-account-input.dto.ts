import { AccountType } from '@contecon/database/generated/prisma'
import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAccountInput {
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
