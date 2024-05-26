import { ScaffoldQuery, type ScaffoldQueryProps } from './query'
import { ScaffoldTable, type ScaffoldTableProps } from './table'

export type ScaffoldProps = {
	queryConfig: ScaffoldQueryProps
	tableConfig: ScaffoldTableProps
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
