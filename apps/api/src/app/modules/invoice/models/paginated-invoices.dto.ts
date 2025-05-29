import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Invoice } from 'src/app/entities/invoice.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedInvoices extends Paginated(Invoice) {}
