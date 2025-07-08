import { Field, InputType, PartialType } from '@nestjs/graphql'
import { CreateScheduleInput } from './create-schedule-input.dto'

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field(() => String)
  id: string
}
