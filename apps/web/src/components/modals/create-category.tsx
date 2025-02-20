import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/text-area'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import {
    CostCenterPayload,
    CostCenterSchema,
} from '@/components/schemas/cost-center-schema'
import { toast } from 'sonner'
import { useSearchParams } from '@/shared/hooks/use-search-params'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GET_ALL_COSTS_CENTERS_GROUPS } from '@/shared/api/queries/get-all-cost-centers-groups'
import { CREATE_COST_CENTER } from '@/shared/api/mutations/create-cost-center'
import { Switch } from '../ui/switch'

export function CreateCategory() {
    const { remove, get } = useSearchParams()
    const [createCostCenter] = useMutation(CREATE_COST_CENTER)

    const { register, handleSubmit, setValue } = useForm<CostCenterPayload>({
        resolver: zodResolver(CostCenterSchema),
    })

    const cashFlowClassifications = [
        { id: '1', name: 'Entradas Operacionais' },
        { id: '2', name: 'Saídas Operacionais' },
        { id: '3', name: 'Investimentos' },
        { id: '4', name: 'Resgate de Investimentos' },
        { id: '5', name: 'Receitas Financeiras' },
        { id: '6', name: 'Financiamentos' },
        { id: '7', name: 'Pagamentos dos Financiamentos' },
        { id: '8', name: 'Despesas Financeiras' },
        { id: '9', name: 'Aporte dos Sócios' },
        { id: '10', name: 'Pagamento aos sócios' },
        { id: '11', name: 'Entrada de Tesouraria' },
        { id: '12', name: 'Saída de Tesouraria' },
    ]

    const dreClassifications = [
        { id: '1', name: 'Receitas Operacionais' },
        { id: '2', name: 'Receitas Financeiras' },
        { id: '4', name: 'Despesas Financeiras' },
        { id: '5', name: 'Despesas Variáveis' },
        { id: '6', name: 'Despesas Fixas' },
        { id: '7', name: 'Custos da Produção - CP' },
        { id: '8', name: 'Custos da Mercadoria Vendida - CMV' },
        { id: '9', name: 'Custos do Serviço Prestado - CSP' },
        { id: '10', name: 'Impostos S/ Vendas' },
        { id: '11', name: 'Impostos S/ Lucro' },
    ]

    // const categorySchema = z.object({
    //     name: z.string().nonempty('Nome é obrigatório'),
    //     description: z.string().optional(),
    //     fatherId: z.string().optional(),
    // })

    const handleCreateCostCenter = (data: CostCenterPayload) => {
        createCostCenter({
            variables: {
                data: {
                    name: data.name,
                    description: data.description,
                    groupId: data.fatherId,
                },
            },
        })
            .then(() => {
                toast.success('Centro de custos criado com sucesso')
                remove('?')
            })
            .catch((error) => {
                toast.error('Erro ao criar centro de custos')
                remove('?')
                console.error(error)
            })
    }

    return (
        <Dialog open={get('?') === 'create'} onOpenChange={() => remove('?')}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova categoria</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Adicione uma nova categoria
                </DialogDescription>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Nome</Label>
                        <Input
                            placeholder='Nome da categoria'
                            {...register('name')}
                        />
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <Select
                            onValueChange={(value) =>
                                setValue('fatherId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Fluxo de caixa' />
                            </SelectTrigger>
                            <SelectContent>
                                {cashFlowClassifications.map((flow) => (
                                    <SelectItem key={flow.id} value={flow.name}>
                                        {flow.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(value) =>
                                setValue('fatherId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Classe do DRE' />
                            </SelectTrigger>
                            <SelectContent>
                                {dreClassifications.map((dre) => (
                                    <SelectItem key={dre.id} value={dre.name}>
                                        {dre.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(value) =>
                                setValue('fatherId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Tipo da conta' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem key={1} value={'Receita'}>
                                    Receita
                                </SelectItem>
                                <SelectItem key={2} value={'Receita'}>
                                    Despesa fixa
                                </SelectItem>
                                <SelectItem key={3} value={'Receita'}>
                                    Despesa variável
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* <div className='flex flex-col gap-2'>
                        <Label>Categoria pai</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue('fatherId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Selecione o grupo' />
                            </SelectTrigger>
                            <SelectContent>
                                {groups?.getAllCostCentersGroups?.map(
                                    (costCenter) => (
                                        <SelectItem
                                            key={costCenter.id}
                                            value={costCenter.id}
                                        >
                                            {costCenter.name}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div> */}
                    <div className='flex flex-col gap-2'>
                        <Label>Descrição</Label>
                        <Textarea
                            placeholder='Descrição do centro de custos'
                            className='resize-none'
                            {...register('description')}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Switch />
                        <Label>Categoria insenta de impostos?</Label>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <Button
                            variant='secondary'
                            onClick={() => remove('add')}
                            className='w-full'
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit(handleCreateCostCenter)}
                            className='w-full'
                        >
                            Adicionar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
