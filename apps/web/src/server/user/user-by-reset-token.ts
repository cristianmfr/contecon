import { TypedDocumentNode, gql } from '@apollo/client'
import { User } from '@contecon/graphql/lib/graphql'

export const USER_BY_RESET_TOKEN: TypedDocumentNode<{
  userByResetToken: User
}> = gql`
  query UserByResetToken($token: String!) {
    userByResetToken(token: $token) {
      id
      email
      name
    }
  }
`
