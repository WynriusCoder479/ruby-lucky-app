import _ from 'lodash'
import { FC } from 'react'
import { BsDatabaseFillExclamation } from 'react-icons/bs'
import { LuLoader } from 'react-icons/lu'

interface UsersProps {
	users: User[] | undefined
	isLoading?: boolean
}

const Users: FC<UsersProps> = ({ users, isLoading }) => {
	const sortedUsers = (users: User[]) => {
		const groupData = _.groupBy(users, user => user.email)

		const data = Object.keys(groupData).map(user => {
			const rawData = groupData[user][0]

			return {
				fullname: rawData.fullname,
				email: rawData.email,
				phone: rawData.phone,
				leadIds: groupData[user].map(data => data.leadId)
			}
		})

		return data
	}

	return (
		<section>
			<div className="sticky inset-x-0 top-0 z-50 border-b border-foreground/20 bg-background py-2.5 shadow-md">
				<p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-bold uppercase tracking-tight text-transparent">
					Danh sách quay thưởng
				</p>
			</div>

			<div className="mt-4">
				{isLoading ? (
					<Loading />
				) : (
					<>
						{!users || users.length < 1 ? (
							<NoUser />
						) : (
							<div className="flex w-full flex-col space-y-4 px-2 pb-2">
								{sortedUsers(users).map(user => (
									<div
										key={user.email}
										className="w-full rounded-2xl border border-foreground/20 bg-background p-1.5 shadow-md"
									>
										<ul className="ml-2 space-y-1.5">
											<li>
												<p>
													<span className="font-bold">Họ và tên:</span>{' '}
													{user.fullname}
												</p>
											</li>
											<li>
												<p>
													<span className="font-bold">Email:</span> {user.email}
												</p>
											</li>
											<li>
												<p>
													<span className="font-bold">Số điện thoại:</span>{' '}
													{user.phone}
												</p>
											</li>
											<li>
												<p className="font-bold">Đơn Đã Lên:</p>
												<ul className="peer ml-4">
													{user.leadIds.map(leadId => (
														<li key={leadId}>{leadId}</li>
													))}
												</ul>
											</li>
										</ul>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</section>
	)
}

const NoUser = () => {
	return (
		<div className="flex h-full w-full items-center justify-center pt-56">
			<div className="flex flex-col items-center justify-center gap-2">
				<BsDatabaseFillExclamation className="size-6" />
				<p className="text-sm tracking-tighter text-foreground/50">
					Danh sách trống
				</p>
			</div>
		</div>
	)
}

const Loading = () => {
	return (
		<div className="flex h-full w-full items-center justify-center pt-56">
			<div className="flex flex-col items-center justify-center gap-2">
				<LuLoader className="size-6 animate-spin" />
				<p className="text-sm tracking-tighter text-foreground/50">
					Chờ xíu...
				</p>
			</div>
		</div>
	)
}

export default Users
