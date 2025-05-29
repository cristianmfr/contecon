import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { InvoiceService } from './invoice.service'
import { InvoiceResolver } from './invoice.resolver'

@Module({
  imports: [PrismaModule],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
