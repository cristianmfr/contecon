import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Beneficiary } from 'src/app/entities/beneficiary.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedBeneficiaries extends Paginated(Beneficiary) {}
