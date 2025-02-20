import { Auth } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const SIGN_IN: TypedDocumentNode<{
    signIn: Auth
    email: string
    password: string
}> = gql`
    mutation SIGN_IN($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            accessToken
        }
    }
`
