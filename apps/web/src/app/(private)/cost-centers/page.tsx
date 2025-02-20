'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { CreateCostCenter } from '@/components/modals/create-cost-center'
import { usePage } from '@/components/templates/page'
import { PageHeader } from '@/components/templates/page/header'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DELETE_COST_CENTER } from '@/shared/api/mutations/delete-cost-center'
import { GET_ALL_COSTS_CENTERS } from '@/shared/api/queries/get-all-cost-centers'
import { CostCenter } from '@/shared/graphql/graphql'
import { useSearchParams } from '@/shared/hooks/use-search-params'
import { useMutation, useQuery } from '@apollo/client'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Plus, Trash, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function CostCenters() {
    const { setBreadcrumbs, setTitle, setSubtitle, setActions } = usePage()
    const { set } = useSearchParams()

    const {
        data: costCenters,
        loading,
        refetch,
    } = useQuery(GET_ALL_COSTS_CENTERS)

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

    const columns: ColumnDef<CostCenter>[] = [
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
        {
            header: '',
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className='flex items-center justify-end gap-2'>
                    <AlertModal
                        title='Deletar centro de custos'
                        description='Tem certeza que deseja deletar este centro de custos?'
                        confirmAction={() => handleDelete(row.original.id)}
                    >
                        <Button size='icon' variant='destructive'>
                            <Trash2 className='size-4' />
                        </Button>
                    </AlertModal>
                    <Button size='icon' variant='secondary'>
                        <Pencil className='size-4' />
                    </Button>
                </div>
            ),
        },
    ]

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Centros de custos', path: '/app/cost-centers' },
        ])
        setTitle('Centros de custos')
        setSubtitle('Gerencie seus centros de custo')
        setActions({
            title: 'novo centro de custos',
            onClick: () => set('?', 'add'),
            icon: <Plus size={12} />,
        })
    }, [])

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Centros de custos', path: '/app/cost-centers' },
        ])
        setTitle('Centros de custos')
        setSubtitle('Gerencie seus centros de custo')
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
                data={costCenters?.getAllCostCenters || []}
                isLoading={loading}
            />
            <CreateCostCenter />
        </div>
    )
}
