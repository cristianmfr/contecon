'use client'

import { CreateCategory } from '@/components/modals/create-category'
import { CreateCostCenter } from '@/components/modals/create-cost-center'
import { usePage } from '@/components/templates/page'
import { PageHeader } from '@/components/templates/page/header'
import { DataTable } from '@/components/ui/data-table'
import { GET_ALL_CATEGORIES } from '@/shared/api/queries/get-all-categories'
import { GET_ALL_COSTS_CENTERS_GROUPS } from '@/shared/api/queries/get-all-cost-centers-groups'
import { Category, CostCenterGroup } from '@/shared/graphql/graphql'
import { useSearchParams } from '@/shared/hooks/use-search-params'
import { useQuery } from '@apollo/client'
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'

export default function Categories() {
    const { setBreadcrumbs, setTitle, setSubtitle, setActions } = usePage()
    const { set } = useSearchParams()

    const { data: categories, loading, refetch } = useQuery(GET_ALL_CATEGORIES)

    const columns: ColumnDef<Category>[] = [
        {
            header: 'Sequência',
            accessorKey: 'sequence',
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    <span className='text-foreground font-semibold'>
                        {row.original.order}.
                    </span>
                    <span>{row.original.name}</span>
                </div>
            ),
        },
        {
            header: 'Descrição',
            accessorKey: 'description',
        },
    ]

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Categorias', path: '/categorias' },
        ])
        setTitle('Centros de custos')
        setSubtitle('Gerencie seus centros de custo')
        setActions({
            title: 'nova categoria',
            onClick: () => set('?', 'add'),
            icon: <Plus size={12} />,
        })
    }, [])

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Centros de custos', path: '/categorias' },
        ])
        setTitle('Categorias')
        setSubtitle('Gerencie suas categorias')
        setActions({
            title: 'novo centro de custos',
            onClick: () => set('?', 'create'),
            icon: <Plus size={12} />,
        })
    }, [])

    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <PageHeader />
            <DataTable
                columns={columns}
                data={categories?.getAllCategories || []}
                isLoading={loading}
            />
            <CreateCategory />
        </div>
    )
}
