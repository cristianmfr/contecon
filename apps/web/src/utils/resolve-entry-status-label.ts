import { EntryStatus } from '@contecon/graphql/lib/graphql'

export const resolveEntryStatusLabel = (status: EntryStatus) => {
	switch (status) {
		case EntryStatus.Pending:
			return 'Pendente'
		case EntryStatus.Received:
			return 'Recebido'
		case EntryStatus.Overdue:
			return 'Vencido'
		case EntryStatus.PartiallyReceived:
			return 'Parcialmente recebido'
		case EntryStatus.Cancelled:
			return 'Cancelado'
		default:
			return 'Pendente'
	}
}
