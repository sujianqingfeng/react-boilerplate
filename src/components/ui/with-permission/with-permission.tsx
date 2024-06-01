import type { ReactNode } from 'react'
import { usePermission } from '~/hooks/use-permission'

export function WithPermission(props: {
	permissions: string[]
	children: ReactNode
}) {
	const { permissions, children } = props

	const { has } = usePermission()

	if (!has(permissions)) {
		return null
	}

	return <>{children}</>
}
