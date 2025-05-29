import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { RecurringBillService } from './recurring-bill.service'
import { RecurringBillResolver } from './recurring-bill.resolver'

@Module({
  imports: [PrismaModule],
  providers: [RecurringBillService, RecurringBillResolver],
  exports: [RecurringBillService],
})
export class RecurringBillModule {}
