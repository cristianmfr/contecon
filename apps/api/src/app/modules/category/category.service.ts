import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateCategoryInput } from './models/create-category-input.dto'
import { UpdateCategoryInput } from './models/update-category-input.dto'
import { CreateCategoryGroupInput } from './models/create-category-group-input.dto'
import { UpdateCategoryGroupInput } from './models/update-category-group-input.dto'

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.category.findMany()
    }

    async getById(id: string) {
        return this.prisma.category.findUnique({
            where: { id },
        })
    }

    async create(data: CreateCategoryInput) {
        const { groupId, ...rest } = data

        return this.prisma.category.create({
            data: {
                ...rest,
                group: {
                    connect: {
                        id: groupId,
                    }
                }
            },
        })
    }

    async update(data: UpdateCategoryInput) {
        const { id, ...rest } = data

        return this.prisma.category.update({
            where: { id },
            data: {
                ...rest,
            },
        })
    }

    async delete(id: string) {
        return this.prisma.category.delete({
            where: { id },
        })
    }

    async getAllGroups() {
        return this.prisma.categoryGroup.findMany()
    }

    async getGroupById(id: string) {
        return this.prisma.categoryGroup.findUnique({
            where: { id },
        })
    }

    async createGroup(data: CreateCategoryGroupInput) {
        const { ...rest } = data

        return this.prisma.categoryGroup.create({
            data: {
                ...rest,
            },
        })
    }

    async updateGroup(data: UpdateCategoryGroupInput) {
        const { id, ...rest } = data

        return this.prisma.categoryGroup.update({
            where: { id },
            data: {
                ...rest,
            },
        })
    }

    async deleteGroup(id: string) {
        return this.prisma.categoryGroup.delete({
            where: { id },
        })
    }
}
