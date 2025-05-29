import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { AccountService } from './account.service'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { Account } from 'src/app/entities/account.entity'
import { CreateAccountInput } from './models/create-account-input.dto'
import { UpdateAccountInput } from './models/update-account-input.dto'
import { PaginatedAccounts } from './models/paginated-accounts.dto'

@Resolver()
export class AccountResolver {
  constructor(private readonly account: AccountService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedAccounts, { name: 'accounts' })
  async findAll(@GetCurrentUser() user: CurrentUser, @Args('query', { nullable: true }) query?: QueryPaginationInput) {
    return this.account.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Account, { name: 'account' })
  async getAccount(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.account.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createAccount' })
  async createAccount(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateAccountInput) {
    return this.account.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateAccount' })
  async updateAccount(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateAccountInput) {
    return this.account.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteAccount' })
  async deleteAccount(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.account.delete(user.userId, id)
  }
}
