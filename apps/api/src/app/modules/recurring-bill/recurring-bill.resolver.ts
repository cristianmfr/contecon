import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RecurringBillService } from './recurring-bill.service'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { PaginatedRecurringBills } from './model/paginated-recurring-bills.dto'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { RecurringBilling } from 'src/app/entities/recurring-billing.entity'
import { CreateRecurringBillInput } from './model/create-recurring-bill-input.dto'
import { UpdateRecurringBillInput } from './model/update-recurring-bill-input.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'

@Resolver()
export class RecurringBillResolver {
  constructor(private readonly recurringBillService: RecurringBillService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedRecurringBills, { name: 'recurringBills' })
  async getRecurringBills(
    @GetCurrentUser() user: CurrentUser,
    @Args('query', { nullable: true }) query?: QueryPaginationInput
  ) {
    return this.recurringBillService.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => RecurringBilling, { name: 'recurringBill' })
  async getRecurringBill(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.recurringBillService.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createRecurringBill' })
  async createRecurringBill(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateRecurringBillInput) {
    return this.recurringBillService.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateRecurringBill' })
  async updateRecurringBill(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateRecurringBillInput) {
    return this.recurringBillService.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteRecurringBill' })
  async deleteRecurringBill(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.recurringBillService.delete(user.userId, id)
  }
}
