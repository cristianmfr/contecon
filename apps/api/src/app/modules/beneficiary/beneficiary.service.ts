import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateBeneficiaryInput } from './models/create-beneficiary-input.dto'
import { UpdateBeneficiaryInput } from './models/update-beneficiary-input.dto'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'

@Injectable()
export class BeneficiaryService {
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
      this.prisma.beneficiary.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.beneficiary.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(userId: string, id: string) {
    return this.prisma.beneficiary.findUnique({
      where: {
        userId,
        id,
      },
    })
  }

  async create(userId: string, body: CreateBeneficiaryInput) {
    const { name, type, email, birthdate, document, documentType, phone } = body

    const beneficiary = await this.prisma.beneficiary.create({
      data: {
        name,
        email,
        type,
        birthdate,
        document,
        documentType,
        phone,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return beneficiary.id
  }

  async update(userId: string, body: UpdateBeneficiaryInput) {
    const { name, type, birthdate, document, documentType, phone, id } = body

    const beneficiary = await this.prisma.beneficiary.update({
      where: {
        id,
      },
      data: {
        name,
        type,
        birthdate,
        document,
        documentType,
        phone,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return beneficiary.id
  }

  async delete(userId: string, id: string) {
    await this.prisma.beneficiary.delete({
      where: {
        userId,
        id,
      },
    })

    return 'Beneficiary deleted successfully'
  }
}
