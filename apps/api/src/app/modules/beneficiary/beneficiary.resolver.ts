import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BeneficiaryService } from './beneficary.service'
import { Beneficiary } from './entities/beneficiary.entity'
import { CreateBeneficiaryInput } from './models/create-beneficiary-input.dto'
import { UpdateBeneficiaryInput } from './models/update-beneficiary-input.dto'

@Resolver()
export class BeneficiaryResolver {
    constructor(private readonly beneficiaryService: BeneficiaryService) {}

    @Query(() => [Beneficiary], { name: 'getAllBeneficiaries' })
    async getAll() {
        return this.beneficiaryService.getAll()
    }

    @Query(() => Beneficiary, { name: 'getBeneficiaryById' })
    async getById(@Args('id', { type: () => String }) id: string) {
        return this.beneficiaryService.getById(id)
    }

    @Mutation(() => Beneficiary, { name: 'createBeneficiary' })
    async create(@Args('data') data: CreateBeneficiaryInput) {
        return this.beneficiaryService.create(data)
    }

    @Mutation(() => Beneficiary, { name: 'updateBeneficiary' })
    async update(@Args('data') data: UpdateBeneficiaryInput) {
        return this.beneficiaryService.update(data)
    }

    @Mutation(() => Beneficiary, { name: 'deleteBeneficiary' })
    async delete(@Args('id', { type: () => String }) id: string) {
        return this.beneficiaryService.delete(id)
    }
}
