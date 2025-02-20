import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { CostCenterService } from './cost-center.service'
import { CostCenterResolver } from './cost-center.resolver'

@Module({
    imports: [PrismaModule],
    providers: [CostCenterService, CostCenterResolver],
    exports: [CostCenterService],
})
export class CostCenterModule {}
