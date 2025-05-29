import { Injectable } from '@nestjs/common'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateRecurringBillInput } from './model/create-recurring-bill-input.dto'
import { UpdateRecurringBillInput } from './model/update-recurring-bill-input.dto'

@Injectable()
export class RecurringBillService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const where: any = { userId }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.recurringBilling.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.recurringBilling.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.recurringBilling.findUnique({
      where: { id, userId },
    })
  }

  async create(userId: string, data: CreateRecurringBillInput) {
    const recurringBill = await this.prisma.recurringBilling.create({
      data: { ...data, userId },
    })

    return recurringBill.id
  }

  async update(userId: string, data: UpdateRecurringBillInput) {
    const { id, ...rest } = data

    const recurringBill = await this.prisma.recurringBilling.update({
      where: { id, userId },
      data: rest,
    })

    return recurringBill.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.recurringBilling.delete({
      where: { id, userId },
    })

    return 'Recurring bill deleted successfully!'
  }
}
