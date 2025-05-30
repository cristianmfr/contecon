import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@contecon/ui/components/alert-dialog'
import { useRouter, useSearchParams } from 'next/navigation'

export function DeleteItemModal({
	path,
	onDelete,
}: {
	path: string
	onDelete: () => void
}) {
	const router = useRouter()

	const searchParams = useSearchParams()
	const itemId = searchParams.get('deleteId')

	return (
		<AlertDialog
			open={!!itemId}
			onOpenChange={() => {
				if (!itemId) {
					router.push(`${path}`)
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Tem certeza que deseja deletar?</AlertDialogTitle>
					<AlertDialogDescription>
						Ao deletar, o item será removido permanentemente. Essa ação não
						poderá ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => router.push(`${path}`)}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Deletar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
