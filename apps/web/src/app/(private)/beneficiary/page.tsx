'use client'

import { CreateCostCenter } from '@/components/modals/create-cost-center'
import { usePage } from '@/components/templates/page'
import { PageHeader } from '@/components/templates/page/header'
import { DataTable } from '@/components/ui/data-table'
import { DELETE_COST_CENTER } from '@/shared/api/mutations/delete-cost-center'
import { GET_ALL_BENEFICIARIES } from '@/shared/api/queries/get-all-beneficiaries'
import { Beneficiary } from '@/shared/graphql/graphql'
import { useSearchParams } from '@/shared/hooks/use-search-params'
import { useMutation, useQuery } from '@apollo/client'
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Beneficiaries() {
    const { setBreadcrumbs, setTitle, setSubtitle, setActions } = usePage()
    const { set } = useSearchParams()

    const {
        data: beneficiaries,
        loading,
        refetch,
    } = useQuery(GET_ALL_BENEFICIARIES)

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

    const columns: ColumnDef<Beneficiary>[] = [
        {
            header: 'Nome',
            accessorKey: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Tipo',
            accessorKey: 'type',
        },
    ]

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', path: '/' },
            { label: 'Favorecidos', path: '/app/cost-centers' },
        ])
        setTitle('Favorecidos')
        setSubtitle('Gerencie seus favorecidos cadastrados')
        setActions({
            title: 'novo favorecido',
            onClick: () => set('?', 'add'),
            icon: <Plus size={12} />,
        })
    }, [])

    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <PageHeader />
            <DataTable
                columns={columns}
                data={beneficiaries?.getAllBeneficiaries || []}
                isLoading={loading}
            />
            <CreateCostCenter />
        </div>
    )
}
