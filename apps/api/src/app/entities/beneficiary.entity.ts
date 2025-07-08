import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { BeneficiaryType, DocumentType } from '@contecon/database/generated/prisma'

registerEnumType(BeneficiaryType, { name: 'BeneficiaryType' })
registerEnumType(DocumentType, { name: 'DocumentType' })

@ObjectType()
export class Beneficiary extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true })
  phone?: string

  @Field(() => String, { nullable: true })
  document?: string

  @Field(() => DocumentType, { nullable: true })
  documentType?: DocumentType

  @Field(() => Date, { nullable: true })
  birthdate?: Date

  @Field(() => BeneficiaryType, { nullable: true })
  type?: BeneficiaryType
}
