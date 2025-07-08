import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateCenterInput } from './create-center-input.dto'

@InputType()
export class UpdateCenterInput extends PartialType(CreateCenterInput) {
  @Field()
  id: string
}
