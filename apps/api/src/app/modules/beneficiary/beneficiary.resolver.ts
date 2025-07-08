import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BeneficiaryService } from './beneficiary.service'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { Beneficiary } from 'src/app/entities/beneficiary.entity'
import { CreateBeneficiaryInput } from './models/create-beneficiary-input.dto'
import { UpdateBeneficiaryInput } from './models/update-beneficiary-input.dto'
import { PaginatedBeneficiaries } from './models/paginated-beneficiaries.dto'

@Resolver()
export class BeneficiaryResolver {
  constructor(private readonly beneficiary: BeneficiaryService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedBeneficiaries, { name: 'beneficiaries' })
  async findAll(@GetCurrentUser() user: CurrentUser, @Args('query', { nullable: true }) query?: QueryPaginationInput) {
    return this.beneficiary.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Beneficiary, { name: 'beneficiary' })
  async getBeneficiary(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.beneficiary.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createBeneficiary' })
  async createBeneficiary(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateBeneficiaryInput) {
    return this.beneficiary.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateBeneficiary' })
  async updateBeneficiary(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateBeneficiaryInput) {
    return this.beneficiary.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteBeneficiary' })
  async deleteBeneficiary(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.beneficiary.delete(user.userId, id)
  }
}
