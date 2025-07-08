import { Injectable } from '@nestjs/common'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateInvoiceInput } from './models/create-invoice-input.dto'

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, query?: QueryPaginationInput) {
    const where: any = { userId }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.invoice.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.invoice.count({ where }),
    ])

    return { items, total }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.invoice.findUnique({
      where: { id, userId },
    })
  }

  async create(userId: string, data: CreateInvoiceInput) {
    return this.prisma.invoice.create({
      data: { ...data, userId },
    })
  }

  async delete(userId: string, id: string) {
    await this.prisma.invoice.delete({
      where: { id, userId },
    })
  }
}
