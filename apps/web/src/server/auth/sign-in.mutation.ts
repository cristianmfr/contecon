import { TypedDocumentNode, gql } from '@apollo/client'
import { Auth, SignInInput } from '@contecon/graphql/lib/graphql'

export const SIGN_IN: TypedDocumentNode<{
	input: SignInInput
	signIn: Auth
}> = gql`
	mutation SIGN_IN($input: SignInInput!) {
		signIn(input: $input) {
			accessToken
			user {
				id
				name
				email
			}
		}
	}
`
