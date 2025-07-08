import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCenterInput {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  isActive?: boolean
}
