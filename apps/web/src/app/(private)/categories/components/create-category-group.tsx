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
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { CREATE_CATEGORY } from '@/shared/api/mutations/create-category'

interface CreateCategoryGroupProps {
    isOpen: boolean
    onClose: () => void
    refecth: () => void
}

export const CreateCategoryGroup = ({
    isOpen,
    onClose,
    refecth,
}: CreateCategoryGroupProps) => {
    const [createCostCenter, { loading }] = useMutation(CREATE_CATEGORY)

    const schema = z.object({
        name: z.string(),
        description: z.string(),
    })

    type CreateCategoryGroupData = z.infer<typeof schema>

    const { register, handleSubmit, reset, setValue } =
        useForm<CreateCategoryGroupData>({
            resolver: zodResolver(schema),
        })

    const handleCreateCostCenter = (data: CreateCategoryGroupData) => {
        createCostCenter({
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
                    <DialogTitle>Criar nova categoria</DialogTitle>
                    <DialogDescription>
                        Descreva a nova categoria
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col w-full gap-4'>
                    <Input
                        label='Nome'
                        placeholder='Digite o nome da categoria'
                        {...register('name')}
                    />
                    <Textarea
                        label='Descrição'
                        placeholder='Descreva sua categoria'
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
