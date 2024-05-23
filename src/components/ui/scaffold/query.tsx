import { Form } from 'antd'
import { DynamicForm, type FormSchema } from '../dynamic-form'

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
	form: Record<string, string>
}

function genKey(field: FormSchema['field']) {
	return Array.isArray(field) ? field.join('-') : field
}

export function ScaffoldQuery(props: ScaffoldQueryProps) {
	const { schemas, form } = props
	return (
		<div className="p-4">
			{JSON.stringify(form)}
			<Form name="validateOnly" layout="inline" autoComplete="off">
				{schemas.map((scheme) => {
					return (
						<Form.Item
							name={scheme.field}
							label={scheme.label}
							key={genKey(scheme.field)}
						>
							<DynamicForm {...scheme} form={form} />
						</Form.Item>
					)
				})}
			</Form>
		</div>
	)
}
