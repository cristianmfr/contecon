import { CentersTable } from '@/src/components/tables/centerss/data-table'
import { Metadata } from 'next'

import { getCentersAction } from './actions'

export const metadata: Metadata = {
	title: 'Centros de custos',
}

export default async function Centers() {
	const { centers } = await getCentersAction()

	return <CentersTable centers={centers.items} />
}
