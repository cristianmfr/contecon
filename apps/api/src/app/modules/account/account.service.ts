import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateAccountInput } from './models/create-account-input.dto'
import { UpdateAccountInput } from './models/update-account-input.dto'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const where: any = { userId }

    if (query?.search) {
      const search = query.search
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }]
    }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.account.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.account.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.account.findUnique({
      where: { userId, id },
    })
  }

  async create(userId: string, data: CreateAccountInput) {
    const { name, bank, description, number, agency, type, balance, credit } = data

    const account = await this.prisma.account.create({
      data: {
        name,
        bank,
        description,
        number,
        agency,
        type,
        balance,
        credit,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return account.id
  }

  async update(userId: string, data: UpdateAccountInput) {
    const { name, bank, description, number, agency, type, balance, credit, id } = data

    const account = await this.prisma.account.update({
      where: {
        id,
        userId,
      },
      data: {
        name,
        bank,
        description,
        number,
        agency,
        type,
        balance,
        credit,
      },
    })

    return account.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.account.delete({
      where: { id, userId },
    })

    return 'Account deleted successfully!'
  }
}
