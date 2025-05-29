import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  isActive?: boolean
}
