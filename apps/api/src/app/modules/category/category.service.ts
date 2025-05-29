import { Injectable } from '@nestjs/common'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateCategoryInput } from './models/create-category-input.dto'
import { UpdateCategoryInput } from './models/update-category-input.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({ skip, take, where: { userId }, orderBy: { createdAt: 'desc' } }),
      this.prisma.category.count(),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.category.findUnique({
      where: { id, userId },
    })
  }

  async create(userId: string, request: CreateCategoryInput) {
    const { name, description, isActive } = request

    const category = await this.prisma.category.create({
      data: {
        name,
        description,
        isActive,
        user: { connect: { id: userId } },
      },
    })

    return category.id
  }

  async update(userId: string, request: UpdateCategoryInput) {
    const { id, name, description, isActive } = request

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        isActive,
        user: { connect: { id: userId } },
      },
    })

    return category.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.category.delete({
      where: { userId, id },
    })

    return 'Category deleted successfully'
  }
}
