'use client'

import { usePage } from '@/components/templates/page'
import { HeaderActions, PageHeader } from '@/components/ui/page-header'
import { DELETE_COST_CENTER } from '@/shared/api/mutations/delete-cost-center'
import { useMutation, useQuery } from '@apollo/client'
import { Group, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CreateCategoryGroup } from './components/create-category-group'
import { GET_ALL_CATEGORIES_GROUPS } from '@/shared/api/queries/get-all-categories-groups'
import { CreateCategory } from './components/create-category'
import { TableWithGroups, TableGroup } from '@/components/ui/table-with-group'

export default function Categories() {
    const { setBreadcrumbs } = usePage()

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Categorias', path: '/cost-centers' },
        ])
    }, [setBreadcrumbs])

    const {
        data: categories,
        loading,
        refetch,
    } = useQuery(GET_ALL_CATEGORIES_GROUPS)

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
        categories?.getAllCategoriesGroups?.map((group) => ({
            id: group.id,
            name: group.name,
            description: group.description || '',
            childrens:
                group.categories?.map((costCenter) => ({
                    id: costCenter.id,
                    name: costCenter.name,
                    description: costCenter.description || '',
                })) || [],
        })) || []

    const headerActions: HeaderActions[] = [
        {
            title: 'nova categoria',
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
                title='Categorias'
                subtitle='Gerencie todas as categorias'
                actions={headerActions}
            />
            <TableWithGroups data={costCentersData} />
            <CreateCategory
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                refecth={refetch}
            />
            <CreateCategoryGroup
                isOpen={isCreateGroupModalOpen}
                onClose={() => setIsCreateGroupModalOpen(false)}
                refecth={refetch}
            />
        </div>
    )
}
