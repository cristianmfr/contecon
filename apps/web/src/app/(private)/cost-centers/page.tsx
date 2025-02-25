'use client'

import { usePage } from '@/components/templates/page'
import { HeaderActions, PageHeader } from '@/components/ui/page-header'
import { DELETE_COST_CENTER } from '@/shared/api/mutations/delete-cost-center'
import { useMutation, useQuery } from '@apollo/client'
import { Group, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CreateCostCenterGroup } from './components/create-cost-center-group'
import { GET_ALL_COSTS_CENTERS_GROUPS } from '@/shared/api/queries/get-all-cost-centers-groups'
import { CreateCostCenter } from './components/create-cost-center'
import { TableWithGroups, TableGroup } from '@/components/ui/table-with-group'

export default function CostCenters() {
    const { setBreadcrumbs } = usePage()

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Centro de Custos', path: '/cost-centers' },
        ])
    }, [setBreadcrumbs])

    const {
        data: costCenter,
        loading,
        refetch,
    } = useQuery(GET_ALL_COSTS_CENTERS_GROUPS)

    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [deleteCostCenter] = useMutation(DELETE_COST_CENTER)

    const handleDelete = async (id: string) => {
        await deleteCostCenter({ variables: { id } })
            .then(() => {
                refetch()
                toast.success('Centro de custos deletado com sucesso!')
            })
            .catch((error) => {
                console.log(error.message)
                toast.error('Erro ao deletar centro de custos!')
            })
    }

    const costCentersData: TableGroup[] =
        costCenter?.getAllCostCentersGroups?.map((group) => ({
            id: group.id,
            name: group.name,
            description: group.description || '',
            childrens:
                group.costCenter?.map((costCenter) => ({
                    id: costCenter.id,
                    name: costCenter.name,
                    description: costCenter.description || '',
                })) || [],
        })) || []

    const headerActions: HeaderActions[] = [
        {
            title: 'novo centro de custos',
            icon: <Plus className='size-6' />,
            type: 'default',
            onClick: () => setIsCreateModalOpen(true),
        },
        {
            icon: <Group className='size-6' />,
            type: 'icon',
            onClick: () => setIsCreateGroupModalOpen(true),
        },
    ]

    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <PageHeader
                title='Centro de Custos'
                subtitle='Gerencie todos os centro de custos criados'
                actions={headerActions}
            />
            <TableWithGroups data={costCentersData} />
            <CreateCostCenter
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                refecth={refetch}
            />
            <CreateCostCenterGroup
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
                refecth={refetch}
            />
        </div>
    )
}
