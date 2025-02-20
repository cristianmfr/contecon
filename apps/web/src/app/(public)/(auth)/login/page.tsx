import { LoginForm } from '@/components/forms/sign-in-forms'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    return (
        <div className='flex flex-col w-full h-screen items-center justify-center gap-4'>
            <div className='flex items-center'>
                <Label className='text-2xl font-semibold'>
                    Bem vindo de volta👋
                </Label>
            </div>
            <Card className='w-[380px]'>
                <CardContent className='flex flex-col gap-2 p-8'>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
