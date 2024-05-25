import { Button, Col, Form, Row, Space } from 'antd'
import type { ColProps, FormProps } from 'antd'
import {
	DynamicForm,
	DynamicFormProvider,
	type FormSchema,
} from '../dynamic-form'

function getKey(field: FormSchema['field']) {
	return Array.isArray(field) ? field.join('-') : field
}

export function resolveInitialForm(schemas: FormSchema[]) {
	return schemas.reduce<Record<string, any>>((pre, { type, field }) => {
		switch (type) {
			case 'select':
				pre[getKey(field)] = null
				break

			default:
				pre[getKey(field)] = Array.isArray(field) ? [] : ''
				break
		}

		return pre
	}, {})
}

function mapFields(schemas: FormSchema[], values: Record<string, string>) {
	const result: Record<string, string> = {
		...values,
	}

	for (const schema of schemas) {
		if (Array.isArray(schema.field)) {
			const { field } = schema
			const fieldKey = getKey(field)

			field.forEach((key, i) => {
				result[key] = values[fieldKey][i] || ''
			})

			delete result[fieldKey]
		}
	}

	return result
}

export type ScaffoldQueryProps = {
	schemas: FormSchema[]
	formItemCol?: ColProps
	action?: {
		showQueryBt?: boolean
		showResetBt?: boolean
		queryBtText?: string
		resetBtText?: string
		span?: number
	}
}

export function ScaffoldQuery(props: ScaffoldQueryProps) {
	const {
		schemas,
		formItemCol = { span: 6, md: 6, sm: 8, xs: 12 },
		action = {
			showQueryBt: true,
			showResetBt: true,
			queryBtText: '查询',
			resetBtText: '重置',
			span: 6,
		},
	} = props

	const initialValues = resolveInitialForm(schemas)
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
		const mappedValues = mapFields(schemas, values)
		console.log('🚀 ~ ScaffoldQuery ~ mappedValues:', mappedValues)
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
					labelAlign="left"
					labelCol={{ span: 4 }}
				>
					<Row className="flex-auto">
						{schemas.map((scheme) => {
							return (
								<Col key={getKey(scheme.field)} {...formItemCol}>
									<Form.Item name={getKey(scheme.field)} label={scheme.label}>
										<DynamicForm {...scheme} />
									</Form.Item>
								</Col>
							)
						})}

						<Col span={action.span}>
							<Form.Item>
								<Space>
									{action.showQueryBt && (
										<Button type="primary" htmlType="submit">
											{action.queryBtText}
										</Button>
									)}

									{action.resetBtText && (
										<Button htmlType="button" onClick={onReset}>
											{action.resetBtText}
										</Button>
									)}
								</Space>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</DynamicFormProvider>
	)
}
