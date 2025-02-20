import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { InflowService } from './inflow.service'
import { Inflow } from './entities/inflow.entities'
import { CreateInflowInput } from './models/create-inflow-input.dto'
import { UpdateInflowInput } from './models/update-inflow-input.dto'

@Resolver()
export class InflowResolver {
    constructor(private readonly inflowService: InflowService) {}

    @Query(() => [Inflow], { name: 'getAllInflows' })
    async getAll() {
        return this.inflowService.getAll()
    }

    @Query(() => Inflow, { name: 'getInflowById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.inflowService.getById(id)
    }

    @Mutation(() => Inflow, { name: 'createInflow' })
    async create(@Args('data') data: CreateInflowInput) {
        return this.inflowService.create(data)
    }

    @Mutation(() => Inflow, { name: 'updateInflow' })
    async update(@Args('data') data: UpdateInflowInput) {
        return this.inflowService.update(data)
    }

    @Mutation(() => Inflow, { name: 'deleteInflow' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.inflowService.delete(id)
    }
}
