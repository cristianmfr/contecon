import { EntryType } from '@contecon/graphql/lib/graphql'

export const resolveEntryTypeLabel = (type: EntryType) => {
	switch (type) {
		case EntryType.Receipt:
			return 'Receita'
		case EntryType.Payment:
			return 'Despesa'
		case EntryType.Transfer:
			return 'Transferência'
	}
}
