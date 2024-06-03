import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { useState, type ReactNode } from 'react'
import { getTheme } from '~/config/theme'
import { ThemeProvider } from '~/features/theme/components/provider'
import { queryClient } from '~/lib/react-query'
import { isSystemDarkMode } from '~/utils/basic'

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(isSystemDarkMode())

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev)
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={{ isDarkMode, toggleDarkMode }}>
				<ConfigProvider theme={getTheme(isDarkMode)}>{children}</ConfigProvider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
