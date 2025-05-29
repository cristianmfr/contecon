import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { GqlConfigService } from './config/graphql.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './app/modules/user/user.module'
import { CategoryModule } from './app/modules/category/category.module'
import { AccountModule } from './app/modules/account/account.module'
import { CenterModule } from './app/modules/center/center.module'
import { BeneficiaryModule } from './app/modules/beneficiary/beneficiary.module'
import { EntryModule } from './app/modules/entry/entry.module'
import { RecurringBillModule } from './app/modules/recurring-bill/recurring-bill.module'
import { InvoiceModule } from './app/modules/invoice/invoice.module'
import { ScheduleModule } from './app/modules/schedule/schedule.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    CenterModule,
    AccountModule,
    BeneficiaryModule,
    EntryModule,
    RecurringBillModule,
    InvoiceModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
