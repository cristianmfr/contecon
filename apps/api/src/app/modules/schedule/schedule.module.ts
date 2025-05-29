import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { ScheduleService } from './schedule.service'
import { ScheduleResolver } from './schedule.resolver'

@Module({
  imports: [PrismaModule],
  providers: [ScheduleService, ScheduleResolver],
  exports: [ScheduleService],
})
export class ScheduleModule {}
