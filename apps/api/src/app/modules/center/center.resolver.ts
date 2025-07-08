import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { CenterService } from './center.service'
import { Center } from 'src/app/entities/center.entity'
import { CreateCenterInput } from './models/create-center-input.dto'
import { UpdateCenterInput } from './models/update-center-input.dto'
import { PaginatedCenters } from './models/paginated-centers.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'

@Resolver()
export class CenterResolver {
  constructor(private readonly center: CenterService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedCenters, { name: 'centers' })
  async getCenters(
    @GetCurrentUser() user: CurrentUser,
    @Args('query', { nullable: true }) query?: QueryPaginationInput
  ) {
    return this.center.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Center, { name: 'center' })
  async getCenter(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.center.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createCenter' })
  async create(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateCenterInput) {
    return this.center.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateCenter' })
  async update(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateCenterInput) {
    return this.center.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteCenter' })
  async delete(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.center.delete(user.userId, id)
  }
}
