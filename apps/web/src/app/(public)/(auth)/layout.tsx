export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main className='grid md:grid-cols-2 w-full h-screen'>
			<div className='flex flex-col w-full h-full items-center justify-center'>
				{children}
			</div>
			<div className='relative hidden bg-muted md:block'></div>
		</main>
	)
}
