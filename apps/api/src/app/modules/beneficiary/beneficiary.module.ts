import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/infra/prisma/prisma.module'
import { BeneficiaryService } from './beneficary.service'
import { BeneficiaryResolver } from './beneficiary.resolver'

@Module({
    imports: [PrismaModule],
    providers: [BeneficiaryService, BeneficiaryResolver],
    exports: [BeneficiaryService],
})
export class BeneficiaryModule {}
