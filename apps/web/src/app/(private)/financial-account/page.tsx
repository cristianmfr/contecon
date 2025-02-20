'use client'

import { CreateCostCenter } from '@/components/modals/create-cost-center'
import { usePage } from '@/components/templates/page'
import { PageHeader } from '@/components/templates/page/header'
import { DataTable } from '@/components/ui/data-table'
import { DELETE_COST_CENTER } from '@/shared/api/mutations/delete-cost-center'
import { GET_ALL_FINANCIAL_ACCOUNTS } from '@/shared/api/queries/get-all-financial-accounts'
import { FinancialAccount } from '@/shared/graphql/graphql'
import { useSearchParams } from '@/shared/hooks/use-search-params'
import { useMutation, useQuery } from '@apollo/client'
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function FinancialAccounts() {
    const { setBreadcrumbs, setTitle, setSubtitle, setActions } = usePage()
    const { set } = useSearchParams()

    const {
        data: financialAccounts,
        loading,
        refetch,
    } = useQuery(GET_ALL_FINANCIAL_ACCOUNTS)

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

    const columns: ColumnDef<FinancialAccount>[] = [
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
        setTitle('Contas financeiras')
        setSubtitle('Gerencie suas contas financeiras')
        setActions({
            title: 'nova conta',
            onClick: () => set('?', 'add'),
            icon: <Plus size={12} />,
        })
    }, [])

    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <PageHeader />
            <DataTable
                columns={columns}
                data={financialAccounts?.getAllFinancialAccounts || []}
                isLoading={loading}
            />
            <CreateCostCenter />
        </div>
    )
}
