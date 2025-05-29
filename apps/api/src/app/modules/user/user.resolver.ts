import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { PaginatedUsers } from './models/paginated-user.dto'
import { QueryPaginationInput } from 'src/common/interfaces/query-pagination-input.dto'
import { User } from 'src/app/entities/user.entity'
import { CreateUserInput } from './models/create-user-input.dto'
import { UpdateUserInput } from './models/update-user.input.dto'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PaginatedUsers, { name: 'users' })
  async getUsers(@Args('query') query: QueryPaginationInput) {
    return this.userService.findAll(query)
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data)
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.update(data)
  }

  @Mutation(() => String, { name: 'deleteUser' })
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.delete(id)
  }

  @Mutation(() => String, { name: 'createResetToken' })
  async createResetToken(@Args('email', { type: () => String }) email: string) {
    return this.userService.createResetToken(email)
  }

  @Mutation(() => String, { name: 'resetPassword' })
  async resetPassword(
    @Args('token', { type: () => String }) token: string,
    @Args('password', { type: () => String }) password: string
  ) {
    return this.userService.resetPassword(token, password)
  }

  @Query(() => User, { name: 'userByResetToken' })
  async getUserByResetToken(@Args('token', { type: () => String }) token: string) {
    return this.userService.getUserByResetToken(token)
  }
}
