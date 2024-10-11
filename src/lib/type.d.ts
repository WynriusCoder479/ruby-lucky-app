type Alphabet =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'

type User = {
	leadId: string
	fullname: string
	email: string
	phone: string
}

type Reward = {
	name: string
	type: RewardType
	ammount: number
	currentAmount: number
	images: string[]
	medal?: string
}

type RewardType = 'first' | 'second' | 'third' | 'consolation'

type UserAndReward = User & Reward

type Rewards = {
	consolation: Reward
	third: Reward
	second: Reward
	first: Reward
}
