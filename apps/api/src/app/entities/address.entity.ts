import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity } from './base.entity'

@ObjectType()
export class Address extends BaseEntity {
  @Field(() => String)
  street: string

  @Field(() => String)
  number: string

  @Field(() => String, { nullable: true })
  complement?: string

  @Field(() => String)
  neighborhood: string

  @Field(() => String)
  city: string

  @Field(() => String)
  state: string

  @Field(() => String)
  zipCode: string

  @Field(() => String)
  country: string
}
