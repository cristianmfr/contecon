import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateUserInput } from './models/create-user-input.dto'
import { hash } from 'bcryptjs'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { UpdateUserInput } from './models/update-user.input.dto'
import { randomUUID } from 'crypto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: QueryPaginationInput) {
    const where: any = {}

    if (query?.search) {
      const search = query.search
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }]
    }

    const skip = query?.skip ?? 0
    const take = query?.take ?? 10

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ where, skip, take }),
      this.prisma.user.count({ where }),
    ])

    return {
      items,
      total,
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async create(data: CreateUserInput) {
    const { password, ...rest } = data

    const hashedPassword = await hash(password, 10)

    const user = await this.prisma.user.create({
      data: { ...rest, password: hashedPassword },
    })

    return user
  }

  async update(data: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id: data.id },
      data,
    })

    return user
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })

    return 'User deleted successfully'
  }

  async createResetToken(email: string) {
    const resetToken = randomUUID().replace(/-/g, '')

    await this.prisma.user.update({
      where: { email },
      data: { resetToken },
    })

    return resetToken
  }

  async getUserByResetToken(token: string) {
    const user = await this.prisma.user.findUnique({
      where: { resetToken: token },
    })

    if (!user) {
      throw new NotFoundException('User not found or token is invalid!')
    }

    return user
  }

  async resetPassword(token: string, password: string) {
    const hashedPassword = await hash(password, 10)

    const user = await this.prisma.user.findUnique({
      where: { resetToken: token },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null },
    })

    return 'Password reset successfully'
  }
}
