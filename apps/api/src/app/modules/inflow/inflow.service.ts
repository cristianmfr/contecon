import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateInflowInput } from './models/create-inflow-input.dto'
import { UpdateInflowInput } from './models/update-inflow-input.dto'

@Injectable()
export class InflowService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.inflow.findMany()
    }

    async getById(id: string) {
        return this.prisma.inflow.findUnique({
            where: { id },
        })
    }

    async create(data: CreateInflowInput) {
        const {
            categoryId,
            costCenterId,
            beneficiaryId,
            financialAccountId,
            ...rest
        } = data

        return this.prisma.inflow.create({
            data: {
                ...rest,
                category: categoryId
                    ? {
                          connect: { id: categoryId },
                      }
                    : undefined,
                costCenter: costCenterId
                    ? {
                          connect: { id: costCenterId },
                      }
                    : undefined,
                beneficiary: beneficiaryId
                    ? {
                          connect: { id: beneficiaryId },
                      }
                    : undefined,
                financialAccount: financialAccountId
                    ? {
                          connect: { id: financialAccountId },
                      }
                    : undefined,
            },
        })
    }

    async update(data: UpdateInflowInput) {
        const {
            id,
            categoryId,
            costCenterId,
            beneficiaryId,
            financialAccountId,
            ...rest
        } = data

        return this.prisma.inflow.update({
            where: { id },
            data: {
                ...rest,
                category: categoryId
                    ? {
                          connect: { id: categoryId },
                      }
                    : undefined,
                costCenter: costCenterId
                    ? {
                          connect: { id: costCenterId },
                      }
                    : undefined,
                beneficiary: beneficiaryId
                    ? {
                          connect: { id: beneficiaryId },
                      }
                    : undefined,
                financialAccount: financialAccountId
                    ? {
                          connect: { id: financialAccountId },
                      }
                    : undefined,
            },
        })
    }

    async delete(id: string) {
        return this.prisma.inflow.delete({
            where: { id },
        })
    }
}
