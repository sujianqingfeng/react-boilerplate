import { Col, Form, Row } from 'antd'
import type { ColProps } from 'antd'
import {
	DynamicForm,
	DynamicFormProvider,
	type FormSchema,
} from '../dynamic-form'

function genKey(field: FormSchema['field']) {
	return Array.isArray(field) ? field.join('-') : field
}

export function resolveForm(schemas: FormSchema[]) {
	const keys = schemas.flatMap((schema) => schema.field)

	return keys.reduce<Record<string, string>>((pre, key) => {
		pre[key] = ''
		return pre
	}, {})
}

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
	formItemLayout?: ColProps
}

export function ScaffoldQuery(props: ScaffoldQueryProps) {
	const { schemas, formItemLayout = { span: 6, md: 8, sm: 12 } } = props
	const formInstance = Form.useFormInstance()

	const initialValues = resolveForm(schemas)

	return (
		<DynamicFormProvider formInstance={formInstance}>
			<div className="p-4">
				<Form
					form={formInstance}
					name="validateOnly"
					layout="inline"
					autoComplete="off"
					initialValues={initialValues}
				>
					<Row className="flex-auto">
						{schemas.map((scheme) => {
							return (
								<Col key={genKey(scheme.field)} {...formItemLayout}>
									<Form.Item name={scheme.field} label={scheme.label}>
										<DynamicForm {...scheme} />
									</Form.Item>
								</Col>
							)
						})}
					</Row>
				</Form>
			</div>
		</DynamicFormProvider>
	)
}
