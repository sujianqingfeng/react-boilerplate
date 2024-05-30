import type { ReactNode } from 'react'
import { Actions, type ActionsProps } from '../actions'

export type ScaffoldOperationProps = {
	title?: ReactNode
	actions?: ActionsProps
}

export function ScaffoldOperation(props: ScaffoldOperationProps) {
	const { title, actions = { list: [] } } = props
	return (
		<div className="px-4 flex justify-between items-center">
			<div>{title}</div>

			<div>
				<Actions {...actions} />
			</div>
		</div>
	)
}
