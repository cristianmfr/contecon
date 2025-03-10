import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'

@Module({
    imports: [PrismaModule],
    providers: [CategoryService, CategoryResolver],
    exports: [CategoryService],
})
export class CategoryModule {}
