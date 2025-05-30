export function convertStringToISO(dateStr: string): string {
	const [day, month, year] = dateStr.split('/')

	if (!day || !month || !year) {
		throw new Error('Invalid date string format')
	}

	const isoDate = new Date(
		Date.UTC(Number(year), Number(month) - 1, Number(day)),
	)
	return isoDate.toISOString()
}
