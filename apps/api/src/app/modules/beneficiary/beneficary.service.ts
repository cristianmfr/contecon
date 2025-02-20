import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateBeneficiaryInput } from './models/create-beneficiary-input.dto'
import { UpdateBeneficiaryInput } from './models/update-beneficiary-input.dto'

@Injectable()
export class BeneficiaryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.beneficiary.findMany()
    }

    async getById(id: string) {
        return this.prisma.beneficiary.findUnique({
            where: { id },
        })
    }

    async create(data: CreateBeneficiaryInput) {
        const { categoryId, costCenterId, ...rest } = data

        return this.prisma.beneficiary.create({
            data: {
                ...rest,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                costCenter: {
                    connect: {
                        id: costCenterId,
                    },
                },
            },
        })
    }

    async update(data: UpdateBeneficiaryInput) {
        const { id, categoryId, costCenterId, ...rest } = data

        return this.prisma.beneficiary.update({
            where: { id },
            data: {
                ...rest,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                costCenter: {
                    connect: {
                        id: costCenterId,
                    },
                },
            },
        })
    }

    async delete(id: string) {
        return this.prisma.beneficiary.delete({
            where: { id },
        })
    }
}
