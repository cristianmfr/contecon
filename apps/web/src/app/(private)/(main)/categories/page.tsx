import { CategoryCreateDialog } from '@/src/components/dialogs/category-create-dialog'
import { CategoryUpdateDialog } from '@/src/components/dialogs/category-update-dialog'
import { CategoriesTable } from '@/src/components/tables/categories/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getCategoriesAction } from './actions'

type SearchParams = { [key: string]: string | undefined }

export async function generateMetadata({
	searchParams,
}: {
	searchParams: SearchParams
}): Promise<Metadata> {
	return {
		title: 'Categorias',
	}
}

export default async function CategoriesPage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { categories } = await getCategoriesAction()

	const revalidateCache = async () => {
		'use server'

		revalidatePath('/categories', 'page')
	}

	return (
		<>
			<CategoriesTable
				categories={categories.items}
				revalidateCategoriesPath={revalidateCache}
			/>

			<CategoryCreateDialog onRevalidateCache={revalidateCache} />

			<CategoryUpdateDialog onRevalidateCache={revalidateCache} />
		</>
	)
}
