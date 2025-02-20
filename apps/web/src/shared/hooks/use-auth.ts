import { useMutation } from '@apollo/client'
import Cookies from 'js-cookie'
import { useCallback } from 'react'
import { SIGN_IN } from '../api/mutations/sign-in'

interface SignInCredentials {
    email: string
    password: string
}

export function useAuth() {
    const [signInMutation] = useMutation(SIGN_IN)

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            try {
                const response = await signInMutation({
                    variables: {
                        email,
                        password,
                    },
                })

                const { accessToken } = response.data?.signIn || {}

                if (accessToken) {
                    Cookies.set('auth-token', accessToken, {
                        expires: 30, // 30 days
                        path: '/',
                    })

                    return true
                }

                return false
            } catch (error) {
                console.error('Authentication error:', error)
                return false
            }
        },
        [signInMutation]
    )

    const signOut = useCallback(() => {
        Cookies.remove('auth-token')
    }, [])

    return {
        signIn,
        signOut,
    }
}
