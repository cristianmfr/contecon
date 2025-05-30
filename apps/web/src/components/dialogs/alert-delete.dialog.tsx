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
import { useCenterParams } from '@/src/hooks/use-centers-params'

export function AlertDeleteDialog({ onDelete }: { onDelete: () => void }) {
	const { deleteCenterId, setParams } = useCenterParams()

	const isOpen = Boolean(deleteCenterId)

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={() => {
				if (!isOpen) {
					setParams(null)
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Tem certeza que deseja deletar?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Ao deletar, o item será removido permanentemente. Essa ação
						não poderá ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setParams(null)}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Deletar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
