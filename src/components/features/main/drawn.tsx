'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PiHandWithdraw } from 'react-icons/pi'
import { useTimeout } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { LuLoader, LuLoader2 } from 'react-icons/lu'
import { rewardsData } from '@/constants/rewards.constants'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useUserAndReward } from '@/stores/result.store'

interface DrawnProps {
	users: User[] | undefined
}

const Drawn: FC<DrawnProps> = ({ users }) => {
	const [user, setUser] = useState<User | undefined>(undefined)
	const [result, setResult] = useState<string>('')
	const [rewards, setRewards] = useState<Rewards>(rewardsData)
	const [currentReward, setCurrentReward] = useState<RewardType>('consolation')
	const [onOpen, setOnOpen] = useState(false)
	const [reward, setReward] = useState<Reward | undefined>(undefined)

	if (!users)
		return (
			<div className="flex h-full w-full items-center justify-center">
				<LuLoader2 className="size-10 animate-spin" />
			</div>
		)

	const drawnList = users.map(user => user.leadId)

	const getRandomItem = (arr: string[]) => {
		const res = arr[Math.floor(Math.random() * arr.length)]

		if (rewards[currentReward].currentAmount === 0) {
			setOnOpen(true)
			return
		}

		const userIndex = users.findIndex(user => user.leadId === res)
		const currentUser = users[userIndex]

		setReward(rewards[currentReward])
		setUser(currentUser)

		const updatedRewards = { ...rewards }

		updatedRewards[currentReward].currentAmount -= 1
		setRewards(updatedRewards)

		setResult(res)
	}

	return (
		<>
			<div className="grid h-full grid-rows-12 divide-y divide-foreground/20">
				<div className="row-span-6 grid grid-cols-[1fr_auto] divide-x divide-foreground/20">
					<div className="p-1.5">
						<div className="flex h-full w-full items-center justify-center gap-4 rounded-lg border border-foreground/20 p-2 shadow-md">
							<div className="flex w-[500px] flex-col items-center justify-center gap-8">
								<h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-3xl font-bold uppercase tracking-tight text-transparent">
									Quay số trúng thưởng
								</h3>
								<div className="flex items-center gap-1.5">
									{!result ? (
										<>
											{[...Array(12).fill('1')].map((item, i) => (
												<div
													className="size-10 rounded-md bg-foreground/30 shadow-md"
													key={i}
												></div>
											))}
										</>
									) : (
										<RenderResult
											result={result}
											users={users}
											user={user as User}
											setResult={setResult}
											reward={reward as Reward}
										/>
									)}
								</div>

								<Button
									onClick={() => getRandomItem(drawnList)}
									className={cn({ ['hidden']: result !== '' })}
								>
									<PiHandWithdraw className="size-6" /> Rút thăm
								</Button>
							</div>
						</div>
					</div>
					<div className="p-1.5">
						<div className="h-full w-[300px] rounded-lg border border-foreground/20 shadow-md">
							{!currentReward ? (
								<div className="flex h-full w-full flex-col items-center justify-center">
									<LuLoader className="size-7 animate-spin" />
								</div>
							) : (
								<CurrentReward {...rewards[currentReward]} />
							)}
						</div>
					</div>
				</div>
				<div className="row-span-6 flex flex-row-reverse items-center justify-center gap-x-2 p-3">
					{Object.keys(rewards).map(key => (
						<Reward
							key={key}
							setCurrentReward={setCurrentReward}
							{...rewards[key as keyof typeof rewards]}
						/>
					))}
				</div>
			</div>
			<AlertDialog
				open={onOpen}
				onOpenChange={setOnOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader className="mt-8">
						<AlertDialogTitle className="text-center">
							Thông báo
						</AlertDialogTitle>
					</AlertDialogHeader>

					<p>Phần quà này đã hết, vui lòng chọn phần quà khác</p>

					<AlertDialogFooter>
						<AlertDialogAction onClick={() => setResult('')}>
							Quay tiếp !!!
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

const Reward: FC<
	Reward & { setCurrentReward: Dispatch<SetStateAction<RewardType>> }
> = ({
	name,
	type,
	images,
	ammount,
	currentAmount,
	medal,
	setCurrentReward
}) => {
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
		<div
			className={cn(
				'relative flex h-full cursor-pointer flex-col space-y-1.5 rounded-lg border border-foreground/20 p-2 shadow-md transition',
				'hover:scale-105',
				'active:scale-100'
			)}
			onClick={() => setCurrentReward(type)}
		>
			<div>
				{medal && (
					<Image
						src={medal}
						width={100}
						height={100}
						alt={medal}
						className="absolute -left-3 -top-1.5 w-10"
					/>
				)}
			</div>

			<p
				className={cn(
					'text-center text-xs font-semibold tracking-tighter text-foreground/50'
				)}
			>
				{ammount} {parseType(type)}
			</p>
			<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-base font-bold uppercase tracking-tight text-transparent drop-shadow-md">
				{name}
			</p>
			<p>
				<span className="font-bold">Số lượng còn lại: </span> {currentAmount}
			</p>

			<Image
				src={images[0]}
				width={500}
				height={500}
				alt="image"
				className="object-cover"
			/>
		</div>
	)
}

const CurrentReward: FC<Reward> = ({ name, type, images }) => {
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
		<div className="flex h-full w-full flex-col items-center gap-2 p-2">
			<p className="text-center text-xs font-bold uppercase text-foreground/50">
				{parseType(type)}
			</p>
			<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-lg font-bold uppercase text-transparent">
				{name}
			</p>
			<Carousel
				opts={{
					align: 'start',
					loop: true
				}}
				plugins={[
					Autoplay({
						delay: 5000
					})
				]}
			>
				<CarouselContent>
					{images.map(image => (
						<CarouselItem
							key={image}
							className="flex items-center justify-center"
						>
							<Image
								src={image}
								alt={image}
								width={500}
								height={500}
								className="w-60 object-contain"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}

const RenderResult: FC<{
	result: string
	users: User[]
	setResult: Dispatch<SetStateAction<string>>
	reward: Reward
	user: User
}> = ({ result, users, setResult, reward }) => {
	const [onOpen, setOnOpen] = useState<boolean>(false)
	const { setUserAndReward } = useUserAndReward()

	useTimeout(
		() => {
			setOnOpen(true)
			setUserAndReward({
				...user,
				...reward
			})
		},
		20 + (result.length + 1) * 200
	)

	const userIndex = users.findIndex(user => user.leadId === result)
	const user = users[userIndex]

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
		<>
			{result.split('').map((item, i) => (
				<Letter
					key={i}
					delay={20 + i * 200}
					letter={item}
				/>
			))}
			<AlertDialog
				open={onOpen}
				onOpenChange={setOnOpen}
			>
				<AlertDialogContent>
					<div className="absolute -top-7 left-1/2 -translate-x-1/2 -rotate-6 transform rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-2.5 text-xl font-bold uppercase text-white">
						Chúc mừng{' '}
					</div>
					<AlertDialogHeader className="mt-8">
						<AlertDialogTitle className="text-center">
							Chúc mừng người dùng{' '}
							<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold uppercase text-transparent">
								{user.fullname}
							</span>{' '}
							đã trúng giải
						</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="flex flex-col gap-4">
						<ul className="rounded-lg border border-foreground/20 bg-foreground/5 p-4">
							<li>
								<span className="font-bold">Đơn đã lên:</span> {result}
							</li>
							<li>
								<span className="font-bold">Số điện thoại:</span> {user.phone}
							</li>
							<li>
								<span className="font-bold">Email:</span> {user.email}
							</li>
						</ul>
						{reward && (
							<div className="flex items-start gap-4 rounded-lg border border-foreground/20 bg-foreground/5 p-2 shadow-md">
								<Image
									src={
										reward.images[
											Math.floor(Math.random() * reward.images.length)
										]
									}
									alt={reward.name}
									width={500}
									height={500}
									className="w-52"
								/>
								<div className="flex flex-col gap-4">
									<p className="text-center font-bold uppercase">
										{parseType(reward.type)}{' '}
									</p>
									<ul>
										<li>
											<p className="text-xs">
												<span className="font-bold">Tên sản phẩm: </span>
												{reward.name}
											</p>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>
					<AlertDialogFooter>
						<AlertDialogAction onClick={() => setResult('')}>
							Quay tiếp !!!
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

const Letter: FC<{ delay: number; letter: string }> = ({ delay, letter }) => {
	const [isLoading, setIsLoading] = useState(true)

	useTimeout(() => {
		setIsLoading(false)
	}, delay)

	return (
		<div
			className={cn(
				'flex size-10 items-center justify-center rounded-md bg-foreground/30 shadow-md',
				{ 'animate-spin': isLoading }
			)}
		>
			<p
				className={cn('text-2xl font-bold', {
					['hidden']: isLoading
				})}
			>
				{letter}
			</p>
		</div>
	)
}

export default Drawn
