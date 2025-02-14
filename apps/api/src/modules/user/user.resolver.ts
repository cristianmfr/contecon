import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './models/create-user-input.dto'
import { UpdateUserInput } from './models/update-user-input.dto'
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator'
import { CurrentUser } from 'src/common/types/current-user.type'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User], { name: 'getAllUsers' })
    async users() {
        return this.userService.getAllUsers()
    }

    @Query(() => User, { name: 'getUserById' })
    async userById(@Args('id', { type: () => String }) id: string) {
        return this.userService.getUserById(id)
    }

    @Query(() => User, { name: 'getUserByEmail' })
    async userByEmail(@Args('email', { type: () => String }) email: string) {
        return this.userService.getUserByEmail(email)
    }

    @UseGuards(AuthGuard)
    @Query(() => User, { name: 'getCurrentUser' })
    async currentUser(@GetCurrentUser() user: CurrentUser) {
        return this.userService.getCurrentUser(user.userId)
    }

    @Mutation(() => User, { name: 'createUser' })
    async createUser(@Args('data') data: CreateUserInput) {
        return this.userService.createUser(data)
    }

    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(@Args('data') data: UpdateUserInput) {
        return this.userService.updateUser(data)
    }

    @Mutation(() => User, { name: 'deleteUser' })
    async deleteUser(@Args('id', { type: () => String }) id: string) {
        return this.userService.deleteUser(id)
    }
}
