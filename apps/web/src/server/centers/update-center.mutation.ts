import { gql } from '@apollo/client'

export const UPDATE_CENTER = gql`
	mutation UpdateCenter($data: UpdateCenterInput!) {
		updateCenter(data: $data)
	}
`
