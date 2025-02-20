import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { CreateCategoryInput } from './models/create-category-input.dto'
import { UpdateCategoryInput } from './models/update-category-input.dto'
import { CategoryGroup } from './entities/category-group.entity'
import { CreateCategoryGroupInput } from './models/create-category-group-input.dto'
import { UpdateCategoryGroupInput } from './models/update-category-group-input.dto'

@Resolver()
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [Category], { name: 'getAllCategories' })
    async getAll() {
        return this.categoryService.getAll()
    }

    @Query(() => Category, { name: 'getCategoryById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.categoryService.getById(id)
    }

    @Mutation(() => Category, { name: 'createCategory' })
    async create(@Args('data') data: CreateCategoryInput) {
        return this.categoryService.create(data)
    }

    @Mutation(() => Category, { name: 'updateCategory' })
    async update(@Args('data') data: UpdateCategoryInput) {
        return this.categoryService.update(data)
    }

    @Mutation(() => Category, { name: 'deleteCategory' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.categoryService.delete(id)
    }

    @Query(() => [CategoryGroup], { name: 'getAllCategoriesGroups' })
    async getAllGroups() {
        return this.categoryService.getAllGroups()
    }

    @Query(() => CategoryGroup, { name: 'getCategoryGroupById' })
    async getGroupById(@Args('id', { type: () => String }) id: string) {
        return this.categoryService.getGroupById(id)
    }

    @Mutation(() => CategoryGroup, { name: 'createCategoryGroup' })
    async createGroup(@Args('data') data: CreateCategoryGroupInput) {
        return this.categoryService.createGroup(data)
    }

    @Mutation(() => CategoryGroup, { name: 'updateCategoryGroup' })
    async updateGroup(@Args('data') data: UpdateCategoryGroupInput) {
        return this.categoryService.updateGroup(data)
    }

    @Mutation(() => CategoryGroup, { name: 'deleteCategoryGroup' })
    async deleteGroup(@Args('id', { type: () => String }) id: string) {
        return this.categoryService.deleteGroup(id)
    }
}
