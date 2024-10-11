import { FC, PropsWithChildren } from 'react'

import Header from '@/components/common/header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className="flex h-full w-full flex-col items-center">
			<Header />
			<div className="container mt-6">{children}</div>
		</main>
	)
}

export default MainLayout
