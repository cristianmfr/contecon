import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'
import { UserRole } from '@contecon/database/generated/prisma'

registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType()
export class User extends BaseEntity {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => UserRole)
  role: UserRole

  @Field(() => String, { nullable: true })
  resetToken?: string

  @Field(() => Boolean)
  isActive: boolean
}
