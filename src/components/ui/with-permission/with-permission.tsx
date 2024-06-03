import type { ReactNode } from 'react'
import { usePermission } from '~/hooks/use-permission'

export function WithPermission({
	permissions,
	children,
}: {
	permissions: string[]
	children: ReactNode
}) {
	const { has } = usePermission()

	if (!has(permissions)) {
		return null
	}

	return <>{children}</>
}
