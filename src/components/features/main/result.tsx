'use client'

import { useUserAndReward } from '@/stores/result.store'
import Image from 'next/image'
import { FC } from 'react'

const Result = () => {
	const { userAndRewardList } = useUserAndReward()

	return (
		<section className="h-full w-full">
			<div className="sticky inset-x-0 top-0 z-50 border-b border-foreground/20 bg-background py-2.5 shadow-md">
				<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold uppercase tracking-tight text-transparent">
					Trúng giải
				</p>
			</div>
			{userAndRewardList.length === 0 ? (
				<div className="flex h-full w-full items-center justify-center">
					<p className="text-sm font-semibold text-foreground/50">
						Chưa có người trúng giải
					</p>
				</div>
			) : (
				<div className="flex h-full w-full flex-col gap-2 p-2">
					{[...userAndRewardList].reverse().map((data, i) => (
						<Board
							{...data}
							key={i}
						/>
					))}
				</div>
			)}
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
		<div className="w-full rounded-lg border border-foreground/10 p-2 shadow-sm">
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
