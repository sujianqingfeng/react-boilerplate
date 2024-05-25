import { Table } from 'antd'
import type { TableProps } from 'antd'

type Columns<T> = TableProps<T>['columns']

export type ScaffoldTableProps<T = any> = {
	dataSource: any[]
	columns: Columns<T>
}
export function ScaffoldTable(props: ScaffoldTableProps) {
	const { dataSource, columns } = props

	return (
		<div className="p-4">
			<Table dataSource={dataSource} columns={columns} />
		</div>
	)
}
