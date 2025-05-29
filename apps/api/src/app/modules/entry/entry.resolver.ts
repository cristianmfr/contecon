import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EntryService } from './entry.service'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { Entry } from 'src/app/entities/entry.entity'
import { CreateEntryInput } from './models/create-entry-input.dto'
import { UpdateEntryInput } from './models/update-entry-input.dto'
import { PaginatedEntries } from './models/paginated-entries.dto'

@Resolver()
export class EntryResolver {
  constructor(private readonly entry: EntryService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedEntries, { name: 'entries' })
  async findAll(@GetCurrentUser() user: CurrentUser, @Args('query', { nullable: true }) query?: QueryPaginationInput) {
    return this.entry.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Entry, { name: 'entry' })
  async getEntry(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.entry.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createEntry' })
  async createEntry(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateEntryInput) {
    return this.entry.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateEntry' })
  async updateEntry(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateEntryInput) {
    return this.entry.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteEntry' })
  async deleteEntry(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.entry.delete(user.userId, id)
  }
}
