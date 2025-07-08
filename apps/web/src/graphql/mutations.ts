import { TypedDocumentNode, gql } from '@apollo/client'
import { Auth, SignInInput } from '@contecon/graphql/lib/graphql'

/* AUTH */

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

/* CENTERS */

export const CREATE_CENTER = gql`
	mutation CreateCenter($data: CreateCenterInput!) {
		createCenter(data: $data)
	}
`

export const UPDATE_CENTER = gql`
	mutation UpdateCenter($data: UpdateCenterInput!) {
		updateCenter(data: $data)
	}
`

export const DELETE_CENTER = gql`
	mutation DeleteCenter($deleteCenterId: String!) {
		deleteCenter(id: $deleteCenterId)
	}
`

/* ACCOUNTS */

export const CREATE_ACCOUNT = gql`
	mutation CreateAccount($data: CreateAccountInput!) {
		createAccount(data: $data)
	}
`

export const DELETE_ACCOUNT = gql`
	mutation DeleteAccount($deleteAccountId: String!) {
		deleteAccount(id: $deleteAccountId)
	}
`

export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($data: UpdateAccountInput!) {
		updateAccount(data: $data)
	}
`

/* BENEFICIARIES */

export const CREATE_BENEFICIARY = gql`
	mutation CreateBeneficiary($data: CreateBeneficiaryInput!) {
		createBeneficiary(data: $data)
	}
`

export const DELETE_BENEFICIARY = gql`
	mutation DeleteBeneficiary($deleteBeneficiaryId: String!) {
		deleteBeneficiary(id: $deleteBeneficiaryId) {
			id
		}
	}
`

export const UPDATE_BENEFICIARY = gql`
	mutation UpdateBeneficiary($data: UpdateBeneficiaryInput!) {
		updateBeneficiary(data: $data)
	}
`

/* CATEGORIES */

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($data: CreateCategoryInput!) {
		createCategory(data: $data)
	}
`

export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($deleteCategoryId: String!) {
		deleteCategory(id: $deleteCategoryId)
	}
`

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($data: UpdateCategoryInput!) {
		updateCategory(data: $data)
	}
`

/* ENTRIES */

export const CREATE_ENTRY = gql`
	mutation CreateEntry($data: CreateEntryInput!) {
		createEntry(data: $data)
	}
`

export const UPDATE_ENTRY = gql`
	mutation UpdateEntry($request: UpdateEntryInput!) {
		updateEntry(request: $request)
	}
`

export const DELETE_ENTRY = gql`
	mutation DeleteEntry($deleteEntryId: String!) {
		deleteEntry(id: $deleteEntryId)
	}
`

/* SCHEDULES */

export const CREATE_SCHEDULE = gql`
	mutation CreateSchedule($data: CreateScheduleInput!) {
		createSchedule(data: $data)
	}
`

export const UPDATE_SCHEDULE = gql`
	mutation UpdateSchedule($data: UpdateScheduleInput!) {
		updateSchedule(data: $data)
	}
`

export const DELETE_SCHEDULE = gql`
	mutation DeleteSchedule($deleteScheduleId: String!) {
		deleteSchedule(id: $deleteScheduleId)
	}
`

/* USER */

export const RESET_USER_PASSWORD = gql`
	mutation ResetPassword($token: String!, $password: String!) {
		resetPassword(token: $token, password: $password)
	}
`

/* RECURRING BILLS */

export const CREATE_RECURRING_BILL = gql`
	mutation CreateRecurringBill($data: CreateRecurringBillInput!) {
		createRecurringBill(data: $data)
	}
`

export const UPDATE_RECURRING_BILL = gql`
	mutation UpdateRecurringBill($data: UpdateRecurringBillInput!) {
		updateRecurringBill(data: $data)
	}
`

export const DELETE_RECURRING_BILL = gql`
	mutation DeleteRecurringBill($deleteRecurringBillId: String!) {
		deleteRecurringBill(id: $deleteRecurringBillId)
	}
`
