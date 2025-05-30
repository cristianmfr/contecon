import { CategoryCreateDialog } from '@/src/components/dialogs/category-create-dialog'
import { CategoryUpdateDialog } from '@/src/components/dialogs/category-update-dialog'
import { CategoriesTable } from '@/src/components/tables/categories/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getCategoriesAction } from './actions'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Categorias',
	}
}

export default async function CategoriesPage() {
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
