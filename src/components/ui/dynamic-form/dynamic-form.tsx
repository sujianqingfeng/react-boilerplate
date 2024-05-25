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
					value={formInstance.getFieldValue(field)}
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
					value={formInstance.getFieldValue(field)}
					onChange={(value) => {
						formInstance.setFieldValue(field, value)
					}}
				/>
			)

		case 'date-range':
			return (
				<DateRange
					start={formInstance.getFieldValue(field[0])}
					end={formInstance.getFieldValue(field[1])}
					onChange={({ start, end }) => {
						console.log('🚀 ~ DynamicForm ~ start:', field[0], start)
						console.log('🚀 ~ DynamicForm ~ end:', field[1], end)
						// formInstance.setFieldsValue({
						// 	[field[0]]: start,
						// 	[field[1]]: end,
						// })

						formInstance.setFieldValue(field[0], start)
						formInstance.setFieldValue(field[1], end)
					}}
				/>
			)

		default:
			return <div> unknown type {type} </div>
	}
}
