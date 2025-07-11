'use client'

import { useAuth } from '@/src/hooks/use-auth'
import { Button } from '@contecon/ui/components/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../input-field'

export function LoginForm() {
	const { signIn } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const loginSchema = z.object({
		email: z.string().email('Digite um e-mail válido'),
		password: z.string().min(6, 'Digite uma senha válida'),
	})

	type LoginFormValues = z.infer<typeof loginSchema>

	const { register, handleSubmit } = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	})

	const loginSubmit = ({ email, password }: LoginFormValues) => {
		setIsLoading(true)

		signIn(email, password)
			.then(() => {
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(err.message)
				setIsLoading(false)
			})
	}

	return (
		<form onSubmit={handleSubmit(loginSubmit)} className='grid gap-4 w-full'>
			<InputField
				name='email'
				type='email'
				label='E-mail'
				placeholder='seu@email.com'
				register={register('email')}
			/>
			<InputField
				name='password'
				type='password'
				label='Senha'
				placeholder='***********'
				register={register('password')}
			/>
			<Button loading={isLoading} disabled={isLoading}>
				Entrar
			</Button>
			<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
				<span className='relative z-10 bg-background px-2 text-muted-foreground'>
					Ou continue com
				</span>
			</div>
			<Button
				disabled={isLoading}
				type='button'
				variant='outline'
				className='w-full'
			>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
					<path
						d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
						fill='currentColor'
					/>
				</svg>
				Entrar com Google
			</Button>
		</form>
	)
}
