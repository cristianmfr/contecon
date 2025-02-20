import {
    CreateFinancialAccountInput,
    FinancialAccount,
} from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const CREATE_FINANCIAL_ACCOUNT: TypedDocumentNode<{
    createFinancialAccount: FinancialAccount
    data: CreateFinancialAccountInput
}> = gql`
    mutation CREATE_FINANCIAL_ACCOUNT($data: CreateFinancialAccountInput!) {
        createFinancialAccount(data: $data) {
            id
        }
    }
`
