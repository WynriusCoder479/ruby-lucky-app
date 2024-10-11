import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const getColIndex = (col: Alphabet) => {
	const colSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

	return colSet.indexOf(col)
}
