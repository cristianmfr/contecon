import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateFinancialAccountInput } from './models/create-financial-account-input.dto'
import { UpdateFinancialAccountInput } from './models/update-financial-account-input.dto'

@Injectable()
export class FinancialAccountService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.financialAccount.findMany()
    }

    async getById(id: string) {
        return this.prisma.financialAccount.findUnique({
            where: { id },
        })
    }

    async create(data: CreateFinancialAccountInput) {
        return this.prisma.financialAccount.create({
            data,
        })
    }

    async update(data: UpdateFinancialAccountInput) {
        const { id, ...rest } = data

        return this.prisma.financialAccount.update({
            where: { id },
            data: rest,
        })
    }

    async delete(id: string) {
        return this.prisma.financialAccount.delete({
            where: { id },
        })
    }
}
