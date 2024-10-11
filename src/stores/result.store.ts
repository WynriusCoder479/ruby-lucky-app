import { create } from 'zustand'

type UserAndReward = User & Reward

interface ResultStore {
	isLoading: boolean
	userAndRewardList: UserAndReward[]
	setIsLoading: (data: boolean) => void
	setUserAndReward: (newUserAndReward: UserAndReward) => void
}

export const useUserAndReward = create<ResultStore>(set => ({
	isLoading: false,
	userAndRewardList: [],
	setIsLoading: data =>
		set(state => ({
			...state,
			isLoading: data
		})),
	setUserAndReward: newUserAndReward =>
		set(state => ({
			...state,
			userAndRewardList: [...state.userAndRewardList, newUserAndReward]
		}))
}))
