import { FinancialAccount } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_FINANCIAL_ACCOUNTS: TypedDocumentNode<{
    getAllFinancialAccounts: FinancialAccount[]
}> = gql`
    query GET_ALL_FINANCIAL_ACCOUNTS {
        getAllFinancialAccounts {
            id
            name
            description
            bank
            creditLimit
        }
    }
`
