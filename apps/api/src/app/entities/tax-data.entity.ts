import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { DocumentType } from '@contecon/database/generated/prisma'

@ObjectType()
export class TaxData extends BaseEntity {
  @Field(() => String)
  email: string

  @Field(() => String)
  tradeName: string

  @Field(() => String)
  companyName: string

  @Field(() => String, { nullable: true })
  document?: string

  @Field(() => DocumentType, { nullable: true })
  documentType?: DocumentType

  @Field(() => String, { nullable: true })
  phone?: string
}
