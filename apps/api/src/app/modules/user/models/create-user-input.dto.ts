import { UserRole } from '@contecon/database/generated/prisma'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => UserRole)
  role: UserRole
}
