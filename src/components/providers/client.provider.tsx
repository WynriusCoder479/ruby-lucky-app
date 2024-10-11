'use client'

import {
	isServer,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default ClientProvider
