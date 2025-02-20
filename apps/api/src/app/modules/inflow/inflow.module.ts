import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { InflowService } from './inflow.service'
import { InflowResolver } from './inflow.resolver'

@Module({
    imports: [PrismaModule],
    providers: [InflowService, InflowResolver],
    exports: [InflowService],
})
export class InflowModule {}
