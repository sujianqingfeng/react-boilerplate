import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/use-theme'

export function ThemeSwitcher() {
	const { isDarkMode, toggleDarkMode } = useTheme()
	return isDarkMode ? (
		<Sun onClick={toggleDarkMode} size={24} />
	) : (
		<Moon onClick={toggleDarkMode} size={24} />
	)
}
