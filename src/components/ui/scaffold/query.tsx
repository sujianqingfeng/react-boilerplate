import { Form, Select } from 'antd'
import type { ReactNode } from 'react'

type FormSelectSchema = {
	type: 'select'
	label: string
	field: string
	options: { label: string; value: string }[]
}
type FormSchema = FormSelectSchema
type FormSchemaType = FormSchema['type']

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
}

function DynamicForm(props: FormSchema) {
	const { type } = props

	const renderFnMap: Record<FormSchemaType, (schema: FormSchema) => ReactNode> =
		{
			select: ({ options }) => {
				return <Select options={options} />
			},
		}

	return renderFnMap[type](props)
}

export function ScaffoldQuery(props: ScaffoldQueryProps) {
	const { schemas } = props
	return (
		<div>
			<Form name="validateOnly" layout="inline" autoComplete="off">
				{schemas.map((scheme) => {
					return (
						<Form.Item
							name={scheme.field}
							label={scheme.label}
							key={scheme.field}
						>
							<DynamicForm {...scheme} />
						</Form.Item>
					)
				})}
			</Form>
			scaffold query
		</div>
	)
}
