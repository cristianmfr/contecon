import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Entry } from 'src/app/entities/entry.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedEntries extends Paginated(Entry) {}
