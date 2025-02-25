import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/text-area'
import { CREATE_COST_CENTER } from '@/shared/api/mutations/create-cost-center'
import { useMutation, useQuery } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { GET_ALL_COSTS_CENTERS_GROUPS } from '@/shared/api/queries/get-all-cost-centers-groups'
import { Label } from '@/components/ui/label'

interface CreateCostCenterProps {
    isOpen: boolean
    onClose: () => void
    refecth: () => void
}

export const CreateCostCenter = ({
    isOpen,
    onClose,
    refecth,
}: CreateCostCenterProps) => {
    const [createCostCenter, { loading }] = useMutation(CREATE_COST_CENTER)
    const { data: groups } = useQuery(GET_ALL_COSTS_CENTERS_GROUPS)

    const schema = z.object({
        name: z.string(),
        description: z.string(),
        groupId: z.string(),
    })

    type CreateCostCenterData = z.infer<typeof schema>

    const { register, handleSubmit, reset, setValue } =
        useForm<CreateCostCenterData>({
            resolver: zodResolver(schema),
        })

    const handleCreateCostCenter = (data: CreateCostCenterData) => {
        createCostCenter({
            variables: {
                data: {
                    name: data.name,
                    description: data.description,
                    groupId: data.groupId,
                },
            },
        })
            .then(() => {
                toast.success('Grupo criado com sucesso!')
                refecth()
                onClose()
                reset()
            })
            .catch((error) => {
                toast.error('Erro ao criar grupo!')
                console.log(error.message)
            })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar novo centro de custos</DialogTitle>
                    <DialogDescription>
                        Descreva o novo centro de custos
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col w-full gap-4'>
                    <Input
                        label='Nome'
                        placeholder='Digite o nome do centro de custos'
                        {...register('name')}
                    />
                    <div className='flex flex-col gap-2'>
                        <Label>Grupo</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue('groupId', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder='Selecione o grupo' />
                            </SelectTrigger>
                            <SelectContent>
                                {groups?.getAllCostCentersGroups.map(
                                    (group) => (
                                        <SelectItem
                                            key={group.id}
                                            value={group.id}
                                        >
                                            {group.name}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <Textarea
                        label='Descrição'
                        placeholder='Descreva seu centro de custos'
                        {...register('description')}
                    />
                    <div className='flex items-center w-full gap-2'>
                        <Button
                            disabled={loading}
                            variant='secondary'
                            onClick={onClose}
                            className='w-full'
                        >
                            cancelar
                        </Button>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit(handleCreateCostCenter)}
                            className='w-full'
                        >
                            adicionar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
