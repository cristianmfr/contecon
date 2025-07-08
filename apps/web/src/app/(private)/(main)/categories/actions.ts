import { CATEGORIES, CATEGORY } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getCategoriesAction = async () => {
	const { data: categories } = await query({
		query: CATEGORIES,
		variables: { query: { skip: 0, take: 10 } },
	})

	return categories
}

export const getCategoryAction = async (categoryId: string) => {
	const { data: category } = await query({
		query: CATEGORY,
		variables: {
			categoryId,
		},
	})

	return category
}

export async function revalidateCategoriesPath() {
	'use server'

	revalidatePath('/categories', 'page')
}
