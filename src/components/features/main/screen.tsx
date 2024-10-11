'use client'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/actions/get-users'
import Drawn from '@/components/features/main/drawn'
import Users from '@/components/features/main/users'
import Result from '@/components/features/main/result'

const MainScreen = () => {
	const { data: users, isPending } = useQuery({
		queryKey: ['Users'],
		queryFn: async () => await getUsers()
	})

	return (
		<div className="grid h-full w-full grid-cols-12 divide-x divide-foreground/20">
			<div className="col-span-3 overflow-y-auto">
				<Users
					users={users}
					isLoading={isPending}
				/>
			</div>
			<div className="col-span-7">
				<Drawn users={users} />
			</div>
			<div className="col-span-2 overflow-y-auto">
				<Result />
			</div>
		</div>
	)
}

export default MainScreen
