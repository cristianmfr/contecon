import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { Category } from 'src/app/entities/category.entity'
import { CreateCategoryInput } from './models/create-category-input.dto'
import { UpdateCategoryInput } from './models/update-category-input.dto'
import { PaginatedCategories } from './models/paginated-categories.dto'

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Query(() => PaginatedCategories, { name: 'categories' })
  async getCategories(
    @GetCurrentUser() user: CurrentUser,
    @Args('query', { nullable: true }) query?: QueryPaginationInput
  ) {
    return this.categoryService.findAll(user.userId, query)
  }

  @UseGuards(AuthGuard)
  @Query(() => Category, { name: 'category' })
  async getCategory(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.categoryService.findOne(user.userId, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'createCategory' })
  async createCategory(@GetCurrentUser() user: CurrentUser, @Args('data') data: CreateCategoryInput) {
    return this.categoryService.create(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'updateCategory' })
  async updateCategory(@GetCurrentUser() user: CurrentUser, @Args('data') data: UpdateCategoryInput) {
    return this.categoryService.update(user.userId, data)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String, { name: 'deleteCategory' })
  async deleteCategory(@GetCurrentUser() user: CurrentUser, @Args('id') id: string) {
    return this.categoryService.delete(user.userId, id)
  }
}
