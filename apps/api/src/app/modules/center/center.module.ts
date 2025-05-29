import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { CenterService } from './center.service'
import { CenterResolver } from './center.resolver'

@Module({
   imports: [PrismaModule],
   providers: [CenterService, CenterResolver],
   exports: [CenterService],
})
export class CenterModule {}
