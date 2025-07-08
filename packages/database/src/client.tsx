/// <reference types="node" />
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClientSingleton = () => {
   return new PrismaClient().$extends(withAccelerate())
}

type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>

declare global {
   var prisma: ExtendedPrismaClient | undefined
}

export const prisma = global.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
