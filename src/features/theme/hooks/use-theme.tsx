import { createContext, useContext } from 'react'

export type ThemeContextType = {
	isDarkMode: boolean
	toggleDarkMode: () => void
}
export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider')
	}

	return context
}
