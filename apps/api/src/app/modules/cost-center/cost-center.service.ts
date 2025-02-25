import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateCostCenterInput } from './models/create-cost-center-input.dto'
import { UpdateCostCenterInput } from './models/update-cost-center-input.dto'
import { CreateCostCenterGroupInput } from './models/create-cost-center-group-input.dto'
import { UpdateCostCenterGroupInput } from './models/update-cost-center-group-input.dto'

@Injectable()
export class CostCenterService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.costCenter.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                group: true,
            },
        })
    }

    async getById(id: string) {
        return this.prisma.costCenter.findUnique({
            where: { id },
            include: {
                group: true,
            },
        })
    }

    async create(data: CreateCostCenterInput) {
        const { groupId, ...rest } = data

        return this.prisma.costCenter.create({
            data: {
                ...rest,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
            },
        })
    }

    async update(data: UpdateCostCenterInput) {
        const { id, groupId, ...rest } = data

        return this.prisma.costCenter.update({
            where: { id },
            data: {
                ...rest,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
            },
        })
    }

    async delete(id: string) {
        return this.prisma.costCenter.delete({
            where: { id },
        })
    }

    async getAllGroups() {
        return this.prisma.costCenterGroup.findMany({
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                costCenter: true,
            },
        })
    }

    async getGroupById(id: string) {
        return this.prisma.costCenterGroup.findUnique({
            where: { id },
            include: {
                costCenter: true,
            },
        })
    }

    async createGroup(data: CreateCostCenterGroupInput) {
        const { ...rest } = data

        return this.prisma.costCenterGroup.create({
            data: {
                ...rest,
            },
        })
    }

    async updateGroup(data: UpdateCostCenterGroupInput) {
        const { id, ...rest } = data

        return this.prisma.costCenterGroup.update({
            where: { id },
            data: {
                ...rest,
            },
        })
    }

    async deleteGroup(id: string) {
        return this.prisma.costCenterGroup.delete({
            where: { id },
        })
    }
}
