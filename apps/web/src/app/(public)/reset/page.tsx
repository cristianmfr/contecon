'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useMutation, useQuery } from '@apollo/client'
import { USER_BY_RESET_TOKEN } from '@/src/server/user/user-by-reset-token'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@contecon/ui/components/card'
import { CreateNewPasswordForm } from '@/src/components/forms/user/create-new-password-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createNewPasswordFormSchema,
  CreateNewPasswordFormSchemaType,
} from '@/src/components/forms/user/create-new-password-form'
import { Button } from '@contecon/ui/components/button'
import { RESET_USER_PASSWORD } from '@/src/server/user/reset-user-password'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPasswordFormSchemaType>({
    resolver: zodResolver(createNewPasswordFormSchema),
  })

  const [resetUserPassword, { loading: resetUserPasswordLoading }] = useMutation(RESET_USER_PASSWORD)

  const handleResetUserPassword = (data: CreateNewPasswordFormSchemaType) => {
    resetUserPassword({ variables: { token, password: data.password } })
      .then(() => {
        router.push('/login')
        toast.success('Senha redefinida com sucesso')
      })
      .catch((error) => {
        toast.error('Erro ao redefinir senha')
        console.error(error)
      })
  }

  if (!token) {
    return null
  }

  const { data, loading, error } = useQuery(USER_BY_RESET_TOKEN, {
    variables: { token },
  })

  if (loading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Loader2 className='h-4 w-4 animate-spin' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='text-red-500'>Error: {error.message}</div>
      </div>
    )
  }

  if (!data?.userByResetToken?.id) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='text-center text-2xl font-bold'>Token de redefinição de senha inválido!</div>
      </div>
    )
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader>
          <CardTitle>Redefinir senha</CardTitle>
          <CardDescription>Por favor, insira uma nova senha para sua conta.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CreateNewPasswordForm register={register} errors={errors} />
          <Button
            className='w-full'
            type='submit'
            disabled={resetUserPasswordLoading}
            onClick={handleSubmit(handleResetUserPassword)}
          >
            Redefinir senha
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
