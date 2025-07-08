import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { BeneficiaryService } from './beneficiary.service'
import { BeneficiaryResolver } from './beneficiary.resolver'

@Module({
  imports: [PrismaModule],
  providers: [BeneficiaryService, BeneficiaryResolver],
  exports: [BeneficiaryService],
})
export class BeneficiaryModule {}
