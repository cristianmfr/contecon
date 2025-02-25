import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import { CREATE_COST_CENTER_GROUP } from '@/shared/api/mutations/create-cost-center-group'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface CreateCostCenterGroupProps {
    isOpen: boolean
    onClose: () => void
    refecth: () => void
}

export const CreateCostCenterGroup = ({
    isOpen,
    onClose,
    refecth,
}: CreateCostCenterGroupProps) => {
    const [createCostCenterGroup, { loading }] = useMutation(
        CREATE_COST_CENTER_GROUP
    )

    const schema = z.object({
        name: z.string(),
        description: z.string(),
    })

    type CreateCostCenterData = z.infer<typeof schema>

    const { register, handleSubmit, reset } = useForm<CreateCostCenterData>({
        resolver: zodResolver(schema),
    })

    const handleCreateCostCenterGroup = (data: CreateCostCenterData) => {
        createCostCenterGroup({
            variables: {
                data: {
                    name: data.name,
                    description: data.description,
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
                    <DialogTitle>
                        Criar novo grupo para Centro de Custos
                    </DialogTitle>
                    <DialogDescription>
                        Descreva o nome do grupo que deseja criar
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col w-full gap-4'>
                    <Input
                        label='Nome'
                        placeholder='Digite o nome do grupo'
                        {...register('name')}
                    />
                    <Textarea
                        label='Descrição'
                        placeholder='Descreva seu grupo'
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
                            onClick={handleSubmit(handleCreateCostCenterGroup)}
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
