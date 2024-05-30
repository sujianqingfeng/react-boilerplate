import type { InputProps, SelectProps } from 'antd'
import { Input, Select } from 'antd'
import { ApiSelect, type ApiSelectProps } from '../api-select'
import { DateRange } from '../date-range'
import { useDynamicFormInstance } from './use-dynamic-form'

type CommonSchema = { label?: string; placeholder?: string }

type FormSelectSchema = CommonSchema & {
	type: 'select'
	field: string
	componentProps?: SelectProps
}

type FormInputSchema = CommonSchema & {
	type: 'input'
	field: string
	componentProps?: InputProps
}

type FormDateRangeSchema = CommonSchema & {
	type: 'date-range'
	field: [string, string]
}

type FormApiSelectSchema = CommonSchema & {
	type: 'api-select'
	field: string
	componentProps: ApiSelectProps
}

export type FormSchema =
	| FormSelectSchema
	| FormInputSchema
	| FormDateRangeSchema
	| FormApiSelectSchema

type DynamicFormProps = FormSchema

export function DynamicForm(props: DynamicFormProps) {
	const { type, placeholder, label, field } = props
	const formInstance = useDynamicFormInstance()

	switch (type) {
		case 'input':
			return (
				<Input
					placeholder={placeholder || `请输入${label}`}
					defaultValue={formInstance.getFieldValue(field)}
					onChange={(value) => {
						formInstance.setFieldValue(field, value.target.value)
					}}
					{...props.componentProps}
				/>
			)

		case 'select':
			return (
				<Select
					placeholder={placeholder || `请选择${label}`}
					defaultValue={formInstance.getFieldValue(field)}
					allowClear
					onChange={(value) => {
						formInstance.setFieldValue(field, value)
					}}
					{...props.componentProps}
				/>
			)

		case 'date-range': {
			const key = field.join('-')
			return (
				<DateRange
					defaultValue={formInstance.getFieldValue(key)}
					onChange={(dates) => {
						formInstance.setFieldValue(key, dates)
					}}
				/>
			)
		}

		case 'api-select':
			return (
				<ApiSelect
					defaultValue={formInstance.getFieldValue(field)}
					onChange={(value) => {
						formInstance.setFieldValue(field, value)
					}}
					placeholder={placeholder || `请选择${label}`}
					allowClear
					{...props.componentProps}
				/>
			)

		default:
			return <div> unknown type {type} </div>
	}
}
