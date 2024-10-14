import { FC, PropsWithChildren } from 'react'

import Header from '@/components/common/header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className="flex h-full w-full flex-col items-center">
			<Header />
			<div className="">
				<div className="container mt-3">{children}</div>
			</div>
		</main>
	)
}

export default MainLayout
