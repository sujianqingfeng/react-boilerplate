import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import type { ReactNode } from 'react'
import { theme } from '~/config/theme'
import { queryClient } from '~/lib/react-query'

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider theme={theme}>{children}</ConfigProvider>
		</QueryClientProvider>
	)
}
