import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { GqlConfigService } from './config/graphql.config'
import { UserModule } from './app/modules/user/user.module'
import { AuthModule } from './app/auth/auth.module'
import { CostCenterModule } from './app/modules/cost-center/cost-center.module'
import { CategoryModule } from './app/modules/category/category.module'
import { BeneficiaryModule } from './app/modules/beneficiary/beneficiary.module'
import { FinancialAccountModule } from './app/modules/financial-account/financial-account.module'
import { InflowModule } from './app/modules/inflow/inflow.module'

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
        CostCenterModule,
        CategoryModule,
        BeneficiaryModule,
        FinancialAccountModule,
        InflowModule,
    ],
})
export class AppModule {}
