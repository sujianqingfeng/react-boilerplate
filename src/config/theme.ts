import type { ThemeConfig } from 'antd'
import { theme as antdTheme } from 'antd'

export function getTheme(isDarkMode: boolean): ThemeConfig {
	return {
		cssVar: true,
		algorithm: isDarkMode
			? antdTheme.darkAlgorithm
			: antdTheme.defaultAlgorithm,
	}
}
