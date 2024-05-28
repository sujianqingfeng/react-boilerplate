import { ScaffoldQuery, type ScaffoldQueryProps } from './query'
import { ScaffoldTable, type ScaffoldTableProps } from './table'

export type ScaffoldProps<T = any> = {
	queryConfig: ScaffoldQueryProps
	tableConfig: ScaffoldTableProps<T>
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig, tableConfig } = props

	return (
		<>
			<ScaffoldQuery {...queryConfig} />
			<ScaffoldTable {...tableConfig} />
		</>
	)
}
