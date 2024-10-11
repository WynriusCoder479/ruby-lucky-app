'use server'

import { getSheets } from '@/lib/google-sheets'
import { getColIndex } from '@/lib/utils'

export const getUsers = async (): Promise<User[]> => {
	const sheets = await getSheets()

	const {
		data: { values }
	} = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SHEET_ID,
		range: 'Allow List'
	})

	if (!values) throw Error('Not found')

	values.shift()

	const resData = values.map<User>(value => ({
		leadId: value[getColIndex('A')],
		fullname: value[getColIndex('B')],
		email: value[getColIndex('C')],
		phone: value[getColIndex('D')]
	}))

	return resData
}
