import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ScheduleService } from './schedule.service'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { Schedule } from 'src/app/entities/schedule.entity'
import { CreateScheduleInput } from './models/create-schedule-input.dto'
import { UpdateScheduleInput } from './models/update-schedule-input.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'

@Resolver()
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Schedule], { name: 'schedules' })
  async getSchedules(@GetCurrentUser() user: CurrentUser) {
    return this.scheduleService.findAll(user.userId)
  }

  @UseGuards(AuthGuard)
  @Query(() => Schedule, { name: 'schedule' })
  async getSchedule(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.scheduleService.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createSchedule' })
  async createSchedule(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateScheduleInput) {
    return this.scheduleService.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateSchedule' })
  async updateSchedule(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateScheduleInput) {
    return this.scheduleService.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteSchedule' })
  async deleteSchedule(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.scheduleService.delete(user.userId, id)
  }
}
