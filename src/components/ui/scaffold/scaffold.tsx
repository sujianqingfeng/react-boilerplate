import { useQuery, type QueryKey } from '@tanstack/react-query'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'
import type { BasePageResp } from '~/types/api'
import { mapFields } from '../dynamic-form/utils'
import { ScaffoldProvider } from './hooks/use-scaffold'
import { ScaffoldOperation, type ScaffoldOperationProps } from './operation'
import { ScaffoldQuery, type ScaffoldQueryProps } from './query'
import { ScaffoldTable, type ScaffoldTableProps } from './table'

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
	operationConfig?: ScaffoldOperationProps
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig, tableConfig, requestConfig, operationConfig } = props
	const { schemas } = queryConfig

	const {
		queryKey,
		queryFn,
		defaultPagination = { pageSize: 10, current: 1 },
	} = requestConfig

	const [formInstance] = Form.useForm()
	const [pagination, updatePagination] = useImmer<Pagination>({
		...defaultPagination,
	})

	const [isFormConnected, setIsFormConnected] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: [
			...queryKey,
			pagination,
			isFormConnected ? formInstance.getFieldsValue() : undefined,
		],
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
		enabled: isFormConnected,
	})

	useEffect(() => {
		setIsFormConnected(true)
	}, [])

	const onQuery = () => {
		refetch()
	}

	const onReset = () => {
		updatePagination((draft) => {
			draft.current = 1
		})
	}

	return (
		<ScaffoldProvider value={{ formInstance, schemas }}>
			<ScaffoldQuery {...queryConfig} onQuery={onQuery} onReset={onReset} />
			<ScaffoldOperation {...operationConfig} />
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
