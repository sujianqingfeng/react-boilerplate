import { useState } from 'react'

export function useLayout() {
	const [collapsed, setCollapsed] = useState(false)

	const toggleCollapsed = () => setCollapsed(!collapsed)

	return {
		collapsed,
		toggleCollapsed,
	}
}
