import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { CreateUserInput } from './models/create-user-input.dto'
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './models/update-user-input.dto'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.user.findMany()
    }

    async getById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        })
    }

    async getByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        })
    }

    async create(data: CreateUserInput) {
        const { email, name, password } = data

        const hashedPassword = await bcrypt.hash(password, 12)

        return this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        })
    }

    async update(data: UpdateUserInput) {
        const { id, email, name, password } = data

        const hashedPassword = await bcrypt.hash(password, 12)

        return this.prisma.user.update({
            where: { id },
            data: {
                email,
                name,
                password: hashedPassword,
            },
        })
    }

    async delete(id: string) {
        return this.prisma.user.delete({
            where: { id },
        })
    }
}
