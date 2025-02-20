'use client'

import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/shared/hooks/use-auth'
import { toast } from 'sonner'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type LoginInput = z.infer<typeof loginSchema>

export const LoginForm = () => {
    const { signIn } = useAuth()

    const { register, handleSubmit } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const handleSignIn = async (data: LoginInput) => {
        signIn(data)
            .then(() => {
                toast.success('Login realizado com sucesso!')
            })
            .catch((err) => {
                console.log(err)
                toast.error('Erro ao realizar login!')
            })
    }

    return (
        <form
            onSubmit={handleSubmit(handleSignIn)}
            className='flex flex-col gap-4'
        >
            <Input
                label='Email'
                placeholder='seu@email.com'
                {...register('email')}
            />
            <Input
                label='Senha'
                placeholder='***********'
                {...register('password')}
            />
            <Button>Login</Button>
            <div className='flex w-full items-center justify-center'>
                <Label className='text-gray-300'>ou</Label>
            </div>
            <Button variant='secondary' type='button'>
                Login com o Google
            </Button>
        </form>
    )
}
