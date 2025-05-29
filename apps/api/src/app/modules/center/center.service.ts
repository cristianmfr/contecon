import { Injectable } from '@nestjs/common'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateCenterInput } from './models/create-center-input.dto'
import { UpdateCenterInput } from './models/update-center-input.dto'

@Injectable()
export class CenterService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.center.findMany({ skip, take, where: { userId }, orderBy: { createdAt: 'desc' } }),
      this.prisma.center.count(),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.center.findUnique({
      where: { id, userId },
    })
  }

  async create(userId: string, data: CreateCenterInput) {
    const { name, description, isActive } = data

    const center = await this.prisma.center.create({
      data: {
        name,
        description,
        isActive,
        user: { connect: { id: userId } },
      },
    })

    return center.id
  }

  async update(userId: string, data: UpdateCenterInput) {
    const { id, name, description, isActive } = data

    const center = await this.prisma.center.update({
      where: { id },
      data: {
        name,
        description,
        isActive,
        user: { connect: { id: userId } },
      },
    })

    return center.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.center.delete({
      where: { userId, id },
    })

    return 'Center deleted successfully'
  }
}
