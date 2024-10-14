'use server'

import { formatInTimeZone } from 'date-fns-tz'

import { getSheets } from '@/lib/google-sheets'

export const saveDrawnResult = async (listResult: UserAndReward[]) => {
	const sheets = await getSheets()

	const now = formatInTimeZone(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy')

	const parseType = (type: RewardType) => {
		switch (type) {
			case 'first':
				return 'Giải nhất'
			case 'second':
				return 'Giải nhì'
			case 'third':
				return 'Giải ba'
			case 'consolation':
				return 'Giải khuyến khích'
		}
	}

	const data = listResult.map(item => [
		`'${item.leadId}`,
		now,
		item.fullname,
		parseType(item.type),
		item.email,
		`'${item.phone}`
	])

	await sheets.spreadsheets.values.append({
		range: 'Result List!A2:F1',
		spreadsheetId: process.env.SHEET_ID,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [...data].reverse()
		}
	})
}
