import { AccountType } from '@contecon/graphql/lib/graphql'

export const resolveAccountType = (type: AccountType) => {
	switch (type) {
		case 'checking':
			return 'Conta corrente'
		case 'savings':
			return 'Conta poupança'
		case 'investment':
			return 'Conta de investimento'
		case 'credit_card':
			return 'Cartão de crédito'
		case 'other':
			return 'Outro'
		default:
			return '-'
	}
}
