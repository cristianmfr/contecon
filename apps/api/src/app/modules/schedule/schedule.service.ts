import { Injectable } from '@nestjs/common'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateScheduleInput } from './models/create-schedule-input.dto'
import { UpdateScheduleInput } from './models/update-schedule-input.dto'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.schedule.findMany({
      where: { userId },
    })
  }

  async findOne(userId: string, id: string) {
    return this.prisma.schedule.findUnique({
      where: { id, userId },
    })
  }

  async create(userId: string, data: CreateScheduleInput) {
    const schedule = await this.prisma.schedule.create({
      data: { ...data, userId },
    })

    return schedule.id
  }

  async update(userId: string, data: UpdateScheduleInput) {
    const { id, ...rest } = data

    const schedule = await this.prisma.schedule.update({
      where: { id, userId },
      data: { ...rest },
    })

    return schedule.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.schedule.delete({
      where: { id, userId },
    })

    return 'Agendamento deletado com sucesso'
  }
}
