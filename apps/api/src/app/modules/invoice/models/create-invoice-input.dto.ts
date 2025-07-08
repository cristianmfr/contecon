import { Field, Float, InputType, registerEnumType } from '@nestjs/graphql'
import { InvoiceStatus } from '@contecon/database/generated/prisma'

registerEnumType(InvoiceStatus, { name: 'InvoiceStatus' })

@InputType()
export class CreateInvoiceInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float)
  amount: number

  @Field(() => Date)
  dueDate: Date

  @Field(() => InvoiceStatus)
  status: InvoiceStatus
}
