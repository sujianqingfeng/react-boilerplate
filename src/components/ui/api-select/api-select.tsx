import {
	useQuery,
	type QueryFunction,
	type QueryKey,
} from '@tanstack/react-query'
import type { SelectProps } from 'antd'
import { Select } from 'antd'

export type ApiSelectProps<T = Record<string, any>> = {
	queryKey: QueryKey
	queryFn: QueryFunction<T[]>
} & Omit<SelectProps, 'options'>

export function ApiSelect({
	queryKey,
	queryFn,
	fieldNames = {},
	...rest
}: ApiSelectProps) {
	const { data, isLoading } = useQuery({
		queryKey,
		queryFn,
	})
	const { label = 'label', value = 'value' } = fieldNames

	const options = data?.map((item) => ({
		label: item[label],
		value: item[value],
	}))

	return <Select {...rest} loading={isLoading} options={options} />
}
