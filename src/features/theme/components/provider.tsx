import { useEffect, type ReactNode } from 'react'
import { ThemeContext, type ThemeContextType } from '../hooks/use-theme'

export function ThemeProvider({
	children,
	value,
}: { children: ReactNode; value: ThemeContextType }) {
	const { isDarkMode } = value

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.toggle('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [isDarkMode])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
