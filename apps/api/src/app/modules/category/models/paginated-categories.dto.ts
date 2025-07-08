import { Paginated } from 'src/common/interfaces/paginated-response.dto'
import { Category } from 'src/app/entities/category.entity'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PaginatedCategories extends Paginated(Category) {}
