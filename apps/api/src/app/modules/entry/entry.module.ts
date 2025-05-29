import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { EntryService } from './entry.service'
import { EntryResolver } from './entry.resolver'

@Module({
  imports: [PrismaModule],
  providers: [EntryService, EntryResolver],
  exports: [EntryService],
})
export class EntryModule {}
