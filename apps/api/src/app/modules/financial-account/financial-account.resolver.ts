import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FinancialAccountService } from './financial-account.service'
import { FinancialAccount } from './entities/financial-account.entity'
import { CreateFinancialAccountInput } from './models/create-financial-account-input.dto'
import { UpdateFinancialAccountInput } from './models/update-financial-account-input.dto'

@Resolver()
export class FinancialAccountResolver {
    constructor(
        private readonly financialAccountService: FinancialAccountService
    ) {}

    @Query(() => [FinancialAccount], { name: 'getAllFinancialAccounts' })
    async getAll() {
        return this.financialAccountService.getAll()
    }

    @Query(() => FinancialAccount, { name: 'getFinancialAccountById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.financialAccountService.getById(id)
    }

    @Mutation(() => FinancialAccount, { name: 'createFinancialAccount' })
    async create(@Args('data') data: CreateFinancialAccountInput) {
        return this.financialAccountService.create(data)
    }

    @Mutation(() => FinancialAccount, { name: 'updateFinancialAccount' })
    async update(@Args('data') data: UpdateFinancialAccountInput) {
        return this.financialAccountService.update(data)
    }

    @Mutation(() => FinancialAccount, { name: 'deleteFinancialAccount' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.financialAccountService.delete(id)
    }
}
