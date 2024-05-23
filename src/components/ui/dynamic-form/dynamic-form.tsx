import { Input, Select } from 'antd'
import { DateRange } from '../date-range'

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

type DynamicFormProps = FormSchema & { form: Record<string, string> }

export function DynamicForm(props: DynamicFormProps) {
	const { type, placeholder, label, form } = props
	switch (type) {
		case 'input':
			return <Input placeholder={placeholder || `请输入${label}`} />

		case 'select':
			return (
				<Select
					options={props.options}
					placeholder={placeholder || `请选择${label}`}
					onChange={(value) => {
						form[props.field] = value
					}}
				/>
			)

		case 'date-range':
			return <DateRange />

		default:
			return <div> unknown type {type} </div>
	}
}
