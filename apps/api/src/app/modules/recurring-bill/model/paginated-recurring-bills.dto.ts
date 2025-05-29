import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { RecurringBilling } from 'src/app/entities/recurring-billing.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedRecurringBills extends Paginated(RecurringBilling) {}
