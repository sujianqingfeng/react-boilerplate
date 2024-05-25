import { Button, Col, Form, Row, Space } from 'antd'
import type { ColProps, FormProps } from 'antd'
import {
	DynamicForm,
	DynamicFormProvider,
	type FormSchema,
} from '../dynamic-form'

function genKey(field: FormSchema['field']) {
	return Array.isArray(field) ? field.join('-') : field
}

export function resolveInitialForm(schemas: FormSchema[]) {
	const keys = schemas.flatMap((schema) => schema.field)

	return keys.reduce<Record<string, string>>((pre, key) => {
		pre[key] = ''
		return pre
	}, {})
}

function filterHiddenFieldKeys(schemas: FormSchema[]) {
	return schemas
		.filter((schema) => Array.isArray(schema.field))
		.flatMap((schema) => schema.field)
}

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
	formItemLayout?: ColProps
}

export function ScaffoldQuery(props: ScaffoldQueryProps) {
	const { schemas, formItemLayout = { span: 6, md: 8, sm: 12 } } = props

	const initialValues = resolveInitialForm(schemas)
	console.log('🚀 ~ ScaffoldQuery ~ initialValues:', initialValues)
	const [formInstance] = Form.useForm()

	const onValuesChange: FormProps['onValuesChange'] = (
		changedValues,
		allValues,
	) => {
		console.log('🚀 ~ ScaffoldQuery ~ allValues:', allValues)
		console.log('🚀 ~ ScaffoldQuery ~ changedValues:', changedValues)
	}

	const onReset = () => {
		formInstance.resetFields()
	}

	const onFinish: FormProps['onFinish'] = (values) => {
		console.log('🚀 ~ ScaffoldQuery ~ values:', values)
	}

	return (
		<DynamicFormProvider formInstance={formInstance}>
			<div className="p-4">
				<Form
					form={formInstance}
					name="validateOnly"
					layout="inline"
					autoComplete="off"
					initialValues={initialValues}
					onValuesChange={onValuesChange}
					onFinish={onFinish}
				>
					<Row className="flex-auto">
						{schemas.map((scheme) => {
							return (
								<Col key={genKey(scheme.field)} {...formItemLayout}>
									<Form.Item name={genKey(scheme.field)} label={scheme.label}>
										<DynamicForm {...scheme} />
									</Form.Item>
								</Col>
							)
						})}

						<Col span={6}>
							<Form.Item>
								<Space>
									<Button type="primary" htmlType="submit">
										Submit
									</Button>
									<Button htmlType="button" onClick={onReset}>
										Reset
									</Button>
								</Space>
							</Form.Item>
						</Col>
					</Row>

					{filterHiddenFieldKeys(schemas).map((key) => (
						<Form.Item key={key} name={key} hidden />
					))}
				</Form>
			</div>
		</DynamicFormProvider>
	)
}
