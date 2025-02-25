import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Fragment } from 'react'
import { Button } from './button'
import { Pencil, Trash2 } from 'lucide-react'

export type GroupChildren = {
    id: string
    name: string
    description: string
}

export type TableGroup = {
    id: string
    name: string
    description: string
    childrens?: GroupChildren[]
}

interface TableWithGroupsProps {
    data?: TableGroup[]
}

export const TableWithGroups = ({ data }: TableWithGroupsProps) => {
    if (data?.length === 0)
        return (
            <div className='flex flex-col w-full gap-4 border rounded-lg'>
                <table>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2} className='h-24 text-center'>
                                Nenhum resultado.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </table>
            </div>
        )

    return (
        <div className='flex flex-col w-full gap-4 border rounded-lg'>
            <table>
                <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, index) => (
                        <Fragment key={index}>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead className='font-bold antialiased text-lg'>
                                    {item.name}
                                </TableHead>
                                <TableHead className='font-bold antialiased text-lg'>
                                    {item.description}
                                </TableHead>
                                <TableHead className='flex items-center justify-end gap-2'>
                                    <Button size='icon' variant='ghost'>
                                        <Trash2 className='size-4 text-red-400' />
                                    </Button>
                                    <Button size='icon' variant='ghost'>
                                        <Pencil className='size-4' />
                                    </Button>
                                </TableHead>
                            </TableRow>
                            {item.childrens?.map((children, index) => (
                                <TableRow
                                    key={index}
                                    className='bg-muted-foreground/5'
                                >
                                    <TableCell>
                                        <span className='font-bold'>
                                            {index + 1}.{' '}
                                        </span>
                                        {children.name}
                                    </TableCell>
                                    <TableCell>
                                        {children.description}
                                    </TableCell>
                                    <TableCell className='flex items-center justify-end gap-2'>
                                        <Button size='icon' variant='ghost'>
                                            <Trash2 className='size-4 text-red-400' />
                                        </Button>
                                        <Button size='icon' variant='ghost'>
                                            <Pencil className='size-4' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Fragment>
                    ))}
                </TableBody>
            </table>
        </div>
    )
}
