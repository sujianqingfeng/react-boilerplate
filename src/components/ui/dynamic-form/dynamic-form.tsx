import { Input, Select } from 'antd'

// type CommonSchema = { label: string; field: string; placeholder?: string }

export type FormSelectSchema = {
	type: 'select'
	options: { label: string; value: string }[]
	label: string
	field: string
	placeholder?: string
}

type FormInputSchema = {
	type: 'input'
	label: string
	field: string
	placeholder?: string
}

export type FormSchema = FormSelectSchema | FormInputSchema

export function DynamicForm(props: FormSchema) {
	const { type, placeholder, label } = props
	switch (type) {
		case 'input':
			return <Input placeholder={placeholder || `请输入${label}`} />

		case 'select':
			return (
				<Select
					options={props.options}
					placeholder={placeholder || `请选择${label}`}
				/>
			)

		default:
			return <div> unknown type {type} </div>
	}
}
