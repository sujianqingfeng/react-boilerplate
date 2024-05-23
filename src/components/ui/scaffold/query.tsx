import { Form } from 'antd'
import { DynamicForm, type FormSchema } from '../dynamic-form'

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
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
		</div>
	)
}
