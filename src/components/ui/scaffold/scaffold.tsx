import { useQuery, type QueryKey } from '@tanstack/react-query'
import { Form, type TablePaginationConfig } from 'antd'
import { useImmer } from 'use-immer'
import type { BasePageResp } from '~/types/api'
import { ScaffoldProvider } from './hooks/use-scaffold'
import { ScaffoldQuery, type ScaffoldQueryProps } from './query'
import { ScaffoldTable, type ScaffoldTableProps } from './table'
import { mapFields } from './utils'

type Pagination = {
	pageSize?: number
	current?: number
}

export type ScaffoldProps<T = any> = {
	queryConfig: ScaffoldQueryProps
	tableConfig: Omit<ScaffoldTableProps<T>, 'dataSource'>
	requestConfig: {
		queryKey: QueryKey
		queryFn: (
			params: Record<string, any>,
			pagination: Required<Pagination>,
		) => Promise<BasePageResp<T[]>>
		defaultPagination?: Pagination
	}
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig, tableConfig, requestConfig } = props
	const { schemas } = queryConfig

	const {
		queryKey,
		queryFn,
		defaultPagination = { pageSize: 10, current: 1 },
	} = requestConfig

	const [formInstance] = Form.useForm()
	const [pagination, updatePagination] = useImmer<TablePaginationConfig>({
		...defaultPagination,
	})

	const { data, isLoading } = useQuery({
		queryKey,
		queryFn() {
			const values = formInstance.getFieldsValue()
			const params = mapFields(schemas, values)
			console.log('🚀 ~ queryFn ~ newValues:', params)
			return queryFn(params, {
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				pageSize: pagination.pageSize!,
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				current: pagination.current!,
			})
		},
	})

	return (
		<ScaffoldProvider value={{ formInstance, schemas }}>
			<ScaffoldQuery {...queryConfig} />
			<ScaffoldTable
				{...tableConfig}
				loading={isLoading}
				dataSource={data?.data.content}
				pagination={{
					...pagination,
					total: data?.data.total,
					onChange(page, pageSize) {
						updatePagination((draft) => {
							draft.current = page
							draft.pageSize = pageSize
						})
					},
				}}
			/>
		</ScaffoldProvider>
	)
}
