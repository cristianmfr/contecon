'use client'

import { SIGN_IN } from '@/src/graphql/mutations'
import { useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

type UserType = {
	id: string
	name: string
	email: string
}

interface AuthContextType {
	user: UserType | null | undefined
	signIn: (email: string, password: string) => Promise<void>
	logout: () => void
}

export const useAuth = (): AuthContextType => {
	const [user, setUser] = useState<UserType | null>()
	const [signInMutation] = useMutation(SIGN_IN)
	const router = useRouter()

	useEffect(() => {
		const storedUser = Cookies.get('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	const signIn = useCallback(
		async (email: string, password: string) => {
			try {
				const { data } = await signInMutation({
					variables: {
						input: {
							email,
							password,
						},
					},
				})

				const { accessToken, user } = data!.signIn

				Cookies.set('accessToken', accessToken)
				localStorage.setItem('user', JSON.stringify(user))
				router.push('/')
				toast.success('Login realizado com sucesso!')

				setUser(user)
			} catch (error) {
				console.error('Failed to sign in:', error)
				toast.error(
					'Erro ao realizar login. Verifique suas credenciais e tente novamente.',
				)
			}
		},
		[signInMutation, router],
	)

	const logout = useCallback(() => {
		Cookies.remove('accessToken')
		Cookies.remove('user')
		setUser(null)
		router.push('/login')
	}, [router])

	return {
		user,
		signIn,
		logout,
	}
}
