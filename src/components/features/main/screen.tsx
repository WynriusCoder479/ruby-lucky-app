'use client'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/actions/get-users'
import Drawn from '@/components/features/main/drawn'
import Result from '@/components/features/main/result'

const MainScreen = () => {
	const { data: users } = useQuery({
		queryKey: ['Users'],
		queryFn: async () => await getUsers()
	})

	return (
		<div className="grid h-full w-full grid-cols-[1fr_auto] divide-x divide-foreground/20">
			{/* <div className="col-span-3 overflow-y-auto">
				<Users
					users={users}
					isLoading={isPending}
				/>
			</div> */}
			<div>
				<Drawn users={users} />
			</div>
			<div className="overflow-y-auto">
				<Result />
			</div>
		</div>
	)
}

export default MainScreen
