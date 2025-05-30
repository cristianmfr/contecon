import { gql } from '@apollo/client'

export const UPDATE_ENTRY = gql`
	mutation UpdateEntry($request: UpdateEntryInput!) {
		updateEntry(request: $request)
	}
`
