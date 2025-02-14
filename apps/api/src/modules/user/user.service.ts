import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/database/prisma/prisma.service'
import { UpdateUserInput } from './models/update-user-input.dto'
import { CreateUserInput } from './models/create-user-input.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    getAllUsers() {
        return this.prisma.user.findMany()
    }

    getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        })
    }

    getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        })
    }

    getCurrentUser(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        })
    }

    async createUser(data: CreateUserInput) {
        const { name, email, password } = data

        const hashedPassword = await bcrypt.hash(password, 12)

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })
    }

    updateUser(data: UpdateUserInput) {
        const { id, ...rest } = data

        return this.prisma.user.update({
            where: { id },
            data: {
                ...rest,
            },
        })
    }

    deleteUser(id: string) {
        return this.prisma.user.delete({
            where: { id },
        })
    }
}
