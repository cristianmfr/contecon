import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
} from '@contecon/ui/components/breadcrumb'
import { Label } from '@contecon/ui/components/label'
import { ChevronRightIcon } from 'lucide-react'

export type BreadcrumbItem = {
	label: string
	url: string
}

export function PageHeader({
	children,
	breadcrumbs,
}: {
	children: React.ReactNode
	breadcrumbs?: BreadcrumbItem[]
}) {
	return (
		<header className='grid grid-cols-2 w-full gap-4'>
			{breadcrumbs && (
				<div className='col-span-2 w-full flex items-center gap-2'>
					<Breadcrumb>
						<BreadcrumbList>
							{breadcrumbs.map((breadcrumb, index) => (
								<BreadcrumbItem key={index}>
									{index === breadcrumbs.length - 1 ? (
										<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink href={breadcrumb.url}>
											{breadcrumb.label}
										</BreadcrumbLink>
									)}
									{index < breadcrumbs.length - 1 && (
										<ChevronRightIcon className='size-4' />
									)}
								</BreadcrumbItem>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			)}
			{children}
		</header>
	)
}

export function PageActions({ children }: { children: React.ReactNode }) {
	return (
		<div className='col-span-1 flex items-center justify-end w-full'>
			{children}
		</div>
	)
}

export function PageTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex items-end'>
			<Label className='text-2xl font-semibold'>{children}</Label>
		</div>
	)
}

export function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex flex-col w-full h-full gap-4 no-scrollbar p-4'>
			{children}
		</main>
	)
}

export function PageContent({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col w-full h-full gap-4 no-scrollbar'>
			{children}
		</div>
	)
}
