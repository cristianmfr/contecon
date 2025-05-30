import { HttpLink } from '@apollo/client'
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs'
import { cookies } from 'next/headers'

const getToken = async () => {
	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value || ''

	return token
}

export const { getClient, query, PreloadQuery } = registerApolloClient(
	async () => {
		const token = await getToken()

		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				uri: 'http://localhost:3333/graphql',
				headers: {
					Authorization: token,
				},
			}),
		})
	},
)
