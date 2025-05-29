import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { InvoiceStatus } from '@contecon/database/generated/prisma'

registerEnumType(InvoiceStatus, { name: 'InvoiceStatus' })

@ObjectType()
export class Invoice extends BaseEntity {
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
