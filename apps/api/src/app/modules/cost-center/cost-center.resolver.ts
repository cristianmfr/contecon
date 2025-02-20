import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CostCenterService } from './cost-center.service'
import { CostCenter } from './entities/cost-center.entity'
import { CreateCostCenterInput } from './models/create-cost-center-input.dto'
import { UpdateCostCenterInput } from './models/update-cost-center-input.dto'
import { CostCenterGroup } from './entities/cost-center-group.entity'
import { CreateCostCenterGroupInput } from './models/create-cost-center-group-input.dto'
import { UpdateCostCenterGroupInput } from './models/update-cost-center-group-input.dto'

@Resolver()
export class CostCenterResolver {
    constructor(private readonly costCenterService: CostCenterService) {}

    @Query(() => [CostCenter], { name: 'getAllCostCenters' })
    async getAll() {
        return this.costCenterService.getAll()
    }

    @Query(() => CostCenter, { name: 'getCostCenterById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.costCenterService.getById(id)
    }

    @Mutation(() => CostCenter, { name: 'createCostCenter' })
    async create(@Args('data') data: CreateCostCenterInput) {
        return this.costCenterService.create(data)
    }

    @Mutation(() => CostCenter, { name: 'updateCostCenter' })
    async update(@Args('data') data: UpdateCostCenterInput) {
        return this.costCenterService.update(data)
    }

    @Mutation(() => CostCenter, { name: 'deleteCostCenter' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.costCenterService.delete(id)
    }

    @Query(() => [CostCenterGroup], { name: 'getAllCostCentersGroups' })
    async getAllGroups() {
        return this.costCenterService.getAllGroups()
    }

    @Query(() => CostCenterGroup, { name: 'getCostCenterGroupById' })
    async getGroupById(@Args('id', { type: () => String }) id: string) {
        return this.costCenterService.getGroupById(id)
    }

    @Mutation(() => CostCenterGroup, { name: 'createCostCenterGroup' })
    async createGroup(@Args('data') data: CreateCostCenterGroupInput) {
        return this.costCenterService.createGroup(data)
    }

    @Mutation(() => CostCenterGroup, { name: 'updateCostCenterGroup' })
    async updateGroup(@Args('data') data: UpdateCostCenterGroupInput) {
        return this.costCenterService.updateGroup(data)
    }

    @Mutation(() => CostCenterGroup, { name: 'deleteCostCenterGroup' })
    async deleteGroup(@Args('id', { type: () => String }) id: string) {
        return this.costCenterService.deleteGroup(id)
    }
}
