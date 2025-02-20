export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='grid grid-cols-2 w-full h-screen'>
            <div className='col-span-1 flex flex-col w-full h-screen items-center justify-center'>
                {children}
            </div>
            <div className='col-span-1 flex flex-col w-full h-screen items-center justify-center bg-accent-foreground/10'></div>
        </div>
    )
}
