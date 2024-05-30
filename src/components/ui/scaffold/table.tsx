import { Table } from 'antd'
import type { TableProps } from 'antd'

export type ScaffoldTableProps<T = any> = TableProps<T>
export function ScaffoldTable(props: ScaffoldTableProps) {
  const { columns, dataSource, rowKey } = props

  const withKeyColumns = columns?.map((column) => {
    const { key } = column
    if ('dataIndex' in column && typeof column.dataIndex === 'string') {
      column.key = key || column.dataIndex
    }
    return column
  })
  console.log('🚀 ~ withKeyColumns ~ withKeyColumns:', withKeyColumns)

  return (
    <div className="p-4">
      <Table dataSource={dataSource} columns={withKeyColumns} rowKey={rowKey ?? 'id'} />
    </div>
  )
}
