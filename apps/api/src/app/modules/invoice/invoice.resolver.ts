import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CreateInvoiceInput } from './models/create-invoice-input.dto'
import { InvoiceService } from './invoice.service'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { PaginatedInvoices } from './models/paginated-invoices.dto'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { Invoice } from 'src/app/entities/invoice.entity'

@Resolver()
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedInvoices, { name: 'invoices' })
  async getInvoices(
    @GetCurrentUser() user: CurrentUser,
    @Args('query', { nullable: true }) query?: QueryPaginationInput
  ) {
    return this.invoiceService.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Invoice, { name: 'invoice' })
  async getInvoice(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.invoiceService.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createInvoice' })
  async createInvoice(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateInvoiceInput) {
    return this.invoiceService.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteInvoice' })
  async deleteInvoice(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.invoiceService.delete(user.userId, id)
  }
}
