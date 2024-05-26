import { Table } from 'antd'
import type { TableProps } from 'antd'

export type ScaffoldTableProps<T = Record<string, any>> = TableProps<T>

const dataSource = [
	{
		key: '1',
		name: 'Mike',
		age: 32,
		address: '10 Downing Street',
	},
	{
		key: '2',
		name: 'John',
		age: 42,
		address: '10 Downing Street',
	},
]

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
]

export function ScaffoldTable(props: ScaffoldTableProps) {
	// const { dataSource, columns } = props

	// const withKeyColumns = columns?.map((column) => {
	// 	// const { key } = column
	// 	// @ts-expect-error
	// 	// column.key = key || column.dataIndex
	// 	return column
	// })
	// console.log('🚀 ~ withKeyColumns ~ withKeyColumns:', withKeyColumns)

	return (
		<div className="p-4">
			fff
			<Table dataSource={dataSource} columns={columns} />
			{/* <Table
				dataSource={[{ username: 'user' }]}
				columns={[{ title: '姓名', dataIndex: 'username', key: 'username' }]}
			/> */}
		</div>
	)
}
