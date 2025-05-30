export type Bank = {
	ispb: string
	name: string
	code: string
	fullName: string
}

export const getBrazilBanks = async (): Promise<Bank[]> => {
	const response = await fetch('https://brasilapi.com.br/api/banks/v1')
	const data = await response.json()

	return data
}
