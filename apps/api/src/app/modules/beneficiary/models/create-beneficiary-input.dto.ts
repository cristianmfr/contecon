import { BeneficiaryType, DocumentType } from '@contecon/database/generated/prisma'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateBeneficiaryInput {
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
