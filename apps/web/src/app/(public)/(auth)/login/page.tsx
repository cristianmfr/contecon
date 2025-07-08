import { LoginForm } from '@/src/components/forms/login-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@contecon/ui/components/card'

export default function LoginPage() {
	return (
		<Card className='w-sm border-none bg-transparent'>
			<CardHeader className='text-center'>
				<CardTitle className='font-semibold text-xl'>
					Bem vindo de volta!
				</CardTitle>
				<CardDescription>Digite seu e-mail e senha para entrar</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	)
}
