import { Input, Select } from 'antd'
import { DateRange } from '../date-range'
import { useDynamicFormInstance } from './use-dynamic-form'

type CommonSchema = { label?: string; placeholder?: string }

type FormSelectSchema = CommonSchema & {
	type: 'select'
	field: string
	options: { label: string; value: string }[]
}

type FormInputSchema = CommonSchema & {
	type: 'input'
	field: string
}

type FormDateRangeSchema = CommonSchema & {
	type: 'date-range'
	field: [string, string]
}

export type FormSchema =
	| FormSelectSchema
	| FormInputSchema
	| FormDateRangeSchema

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
				/>
			)

		case 'select':
			return (
				<Select
					options={props.options}
					placeholder={placeholder || `请选择${label}`}
					defaultValue={formInstance.getFieldValue(field)}
					allowClear
					onChange={(value) => {
						formInstance.setFieldValue(field, value)
					}}
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

		default:
			return <div> unknown type {type} </div>
	}
}
