import { gql } from '@apollo/client'

export const CREATE_CENTER = gql`
	mutation CreateCenter($data: CreateCenterInput!) {
		createCenter(data: $data)
	}
`
