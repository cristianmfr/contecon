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
import { Label } from '@/components/ui/label'
import { CREATE_CATEGORY } from '@/shared/api/mutations/create-category'
import { GET_ALL_CATEGORIES_GROUPS } from '@/shared/api/queries/get-all-categories-groups'

interface CreateCategoryProps {
    isOpen: boolean
    onClose: () => void
    refecth: () => void
}

export const CreateCategory = ({
    isOpen,
    onClose,
    refecth,
}: CreateCategoryProps) => {
    const [createCostCenter, { loading }] = useMutation(CREATE_CATEGORY)
    const { data: groups } = useQuery(GET_ALL_CATEGORIES_GROUPS)

    const schema = z.object({
        name: z.string(),
        description: z.string(),
        groupId: z.string(),
    })

    type CreateCategoryData = z.infer<typeof schema>

    const { register, handleSubmit, reset, setValue } =
        useForm<CreateCategoryData>({
            resolver: zodResolver(schema),
        })

    const handleCreateCostCenter = (data: CreateCategoryData) => {
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
                                {groups?.getAllCategoriesGroups.map((group) => (
                                    <SelectItem key={group.id} value={group.id}>
                                        {group.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
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
