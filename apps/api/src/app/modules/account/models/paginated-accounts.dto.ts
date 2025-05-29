import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Account } from 'src/app/entities/account.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedAccounts extends Paginated(Account) {}
