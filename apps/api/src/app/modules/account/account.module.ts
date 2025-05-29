import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { AccountService } from './account.service'
import { AccountResolver } from './account.resolver'

@Module({
   imports: [PrismaModule],
   providers: [AccountService, AccountResolver],
   exports: [AccountService],
})
export class AccountModule {}
