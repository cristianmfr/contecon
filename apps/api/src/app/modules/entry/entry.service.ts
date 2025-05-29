import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateEntryInput } from './models/create-entry-input.dto'
import { UpdateEntryInput } from './models/update-entry-input.dto'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'

@Injectable()
export class EntryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const where: any = { userId }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.entry.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { beneficiary: true, category: true, account: true },
      }),
      this.prisma.entry.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.entry.findUnique({
      where: {
        userId,
        id,
      },
    })
  }

  async create(userId: string, body: CreateEntryInput) {
    const {
      type,
      description,
      receiveFrom,
      totalValue,
      dueDate,
      paymentDate,
      offsetDate,
      status,
      centerId,
      categoryId,
      accountId,
      beneficiaryId,
    } = body

    const entry = await this.prisma.entry.create({
      data: {
        type,
        description,
        receiveFrom,
        totalValue,
        dueDate,
        paymentDate,
        offsetDate,
        status,
        center: {
          connect: {
            id: centerId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        beneficiary: {
          connect: {
            id: beneficiaryId,
          },
        },
        account: {
          connect: {
            id: accountId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return entry.id
  }

  async update(userId: string, body: UpdateEntryInput) {
    const {
      id,
      type,
      description,
      receiveFrom,
      totalValue,
      dueDate,
      paymentDate,
      offsetDate,
      status,
      centerId,
      categoryId,
      accountId,
      beneficiaryId,
    } = body

    const entry = await this.prisma.entry.update({
      where: { id },
      data: {
        type,
        description,
        receiveFrom,
        totalValue,
        dueDate,
        paymentDate,
        offsetDate,
        status,
        center: {
          connect: {
            id: centerId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        beneficiary: {
          connect: {
            id: beneficiaryId,
          },
        },
        account: {
          connect: {
            id: accountId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return entry.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.entry.delete({
      where: {
        userId,
        id,
      },
    })

    return 'Entry deleted successfully!'
  }
}
