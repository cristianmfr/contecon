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
// import { CREATE_COST_CENTER } from '@/shared/api/mutations/create-cost-center'
// import { GET_ALL_COST_CENTERS } from '@/shared/api/queries/get-all-cost-centers'
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

export function CreateCostCenter() {
    const {
        data: groups,
        loading,
        refetch,
    } = useQuery(GET_ALL_COSTS_CENTERS_GROUPS)
    const { remove, get } = useSearchParams()
    const [createCostCenter] = useMutation(CREATE_COST_CENTER)

    const { register, handleSubmit, setValue } = useForm<CostCenterPayload>({
        resolver: zodResolver(CostCenterSchema),
    })

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
                refetch()
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
                    <DialogTitle>Novo centro de custos</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Adicione um novo centro de custos
                </DialogDescription>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label>Nome</Label>
                        <Input
                            placeholder='Nome do centro de custos'
                            {...register('name')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Centro de custos pai</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue('fatherId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Selecione o centro de custos pai' />
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
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label>Descrição</Label>
                        <Textarea
                            placeholder='Descrição do centro de custos'
                            className='resize-none'
                            {...register('description')}
                        />
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
                            disabled={loading}
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
