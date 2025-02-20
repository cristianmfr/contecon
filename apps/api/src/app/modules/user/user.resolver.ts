import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { CreateUserInput } from './models/create-user-input.dto'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User], { name: 'getAllUsers' })
    async getAll() {
        return this.userService.getAll()
    }

    @Query(() => User, { name: 'getUserById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.userService.getById(id)
    }

    @Query(() => User, { name: 'getCurrentUser' })
    @UseGuards(AuthGuard)
    async getCurrentUser(@GetCurrentUser() user: CurrentUser) {
        return this.userService.getById(user.userId)
    }

    @Query(() => User, { name: 'getUserByEmail' })
    async getByEmail(@Args('email', { type: () => String }) email: string) {
        return this.userService.getByEmail(email)
    }

    @Mutation(() => User, { name: 'createUser' })
    async create(@Args('data') data: CreateUserInput) {
        return this.userService.create(data)
    }

    @Mutation(() => User, { name: 'updateUser' })
    async update(@Args('data') data: CreateUserInput) {
        return this.userService.update(data)
    }

    @Mutation(() => User, { name: 'deleteUser' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.userService.delete(id)
    }
}
