import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { ObjectType } from '@nestjs/graphql'
import { User } from 'src/app/entities/user.entity'

@ObjectType()
export class PaginatedUsers extends Paginated(User) {}
