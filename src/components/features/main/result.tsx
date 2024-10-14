/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu'

import { saveDrawnResult } from '@/actions/save-drawn-result'
import { Button } from '@/components/ui/button'
import { TOTAL_REWARD } from '@/constants/rewards.constants'
import { cn } from '@/lib/utils'
import { useUserAndReward } from '@/stores/result.store'

type SaveType = {
	isSave: boolean
	canSave: boolean
	saved: boolean
}

const Result = () => {
	const [save, setSave] = useState<SaveType>({
		isSave: false,
		canSave: false,
		saved: false
	})

	const { userAndRewardList } = useUserAndReward()

	const { mutate, isPending } = useMutation({
		mutationFn: async (listResult: UserAndReward[]) =>
			await saveDrawnResult(listResult),
		onSuccess: () => {
			setSave({
				...save,
				saved: true
			})
		}
	})

	useEffect(() => {
		if (userAndRewardList.length > 0) {
			setSave({
				...save,
				isSave: true
			})
		}

		if (userAndRewardList.length === TOTAL_REWARD) {
			setSave({
				...save,
				canSave: true
			})
		}
	}, [userAndRewardList.length])

	console.log(save)

	return (
		<section className="h-[640px] w-full">
			<div className="sticky inset-x-0 top-0 z-50 border-b border-foreground/20 bg-background py-2.5 shadow-md">
				<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold uppercase tracking-tight text-transparent">
					Trúng giải
				</p>
			</div>
			{userAndRewardList.length === 0 ? (
				<div className="flex h-full w-[210px] items-center justify-center px-2">
					<p className="text-center text-sm font-semibold text-foreground/50">
						Chưa có người trúng giải
					</p>
				</div>
			) : (
				<div className="relative flex h-full w-full flex-col gap-2 p-2">
					{[...userAndRewardList].reverse().map((data, i) => (
						<Board
							{...data}
							key={i}
						/>
					))}
				</div>
			)}
			{save.isSave ? (
				<div
					className={cn(
						'sticky inset-x-0 bottom-0 z-50 flex items-center justify-center border-b border-t border-foreground/20 bg-gradient-to-t from-background to-transparent py-2.5 shadow-md backdrop-blur-md'
					)}
				>
					<Button
						disabled={!save.canSave || isPending || save.saved}
						onClick={() => mutate(userAndRewardList)}
						className="flex gap-x-4"
					>
						{isPending ? <LuLoader2 className="size-4 animate-spin" /> : null}
						{save.saved ? 'Đã lưu' : 'Lưu danh sách'}
					</Button>
				</div>
			) : null}
		</section>
	)
}

type UserAndReward = User & Reward

const Board: FC<UserAndReward> = ({ ...props }) => {
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

	return (
		<div className="w-[210px] rounded-lg border border-foreground/10 p-2 shadow-sm">
			<div className="flex items-center gap-4">
				{props.medal && (
					<Image
						src={props.medal}
						width={100}
						height={100}
						alt={props.medal}
						className="w-10"
					/>
				)}
				<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm font-semibold text-transparent">
					{props.fullname}
				</p>
			</div>
			<ul className="ml-2 text-sm">
				<li className="font-semibold">
					{parseType(props.type)} {props.ammount - props.currentAmount}
				</li>
				<li>
					<span className="font-semibold">Email</span> {props.email}
				</li>
				<li>
					<span className="font-semibold">Sô điện thoại</span> {props.phone}
				</li>
			</ul>
		</div>
	)
}

export default Result
