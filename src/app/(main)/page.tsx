import { QueryClient } from '@tanstack/react-query'

import { getUsers } from '@/actions/get-users'
import MainScreen from '@/components/features/main/screen'

const HomePage = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['Users'],
		queryFn: async () => await getUsers()
	})

	return (
		<div className="h-[670px] w-full overflow-hidden rounded-2xl border border-foreground/20 bg-background shadow-md">
			<MainScreen />
		</div>
	)
}

export default HomePage
