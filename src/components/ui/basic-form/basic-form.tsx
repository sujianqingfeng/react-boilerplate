import { Form, type FormInstance } from 'antd'
import { forwardRef, useImperativeHandle, type Ref } from 'react'
import {
	DynamicForm,
	DynamicFormProvider,
	getKey,
	getPlaceholder,
	resolveInitialForm,
	type FormSchema,
} from '../dynamic-form'

export type BasicFormRef = FormInstance
export type BasicFormProps = {
	schemas: FormSchema[]
}

export const BasicForm = forwardRef(
	({ schemas }: BasicFormProps, ref: Ref<BasicFormRef>) => {
		const initialValues = resolveInitialForm(schemas)
		const [formInstance] = Form.useForm()

		useImperativeHandle(ref, () => {
			return formInstance
		})

		return (
			<DynamicFormProvider formInstance={formInstance}>
				<Form
					form={formInstance}
					name="validateOnly"
					autoComplete="off"
					initialValues={initialValues}
					labelAlign="left"
					labelCol={{ span: 4 }}
				>
					{schemas.map((scheme) => {
						const { field, label, required } = scheme

						return (
							<Form.Item
								key={getKey(field)}
								name={getKey(field)}
								label={label}
								rules={
									required
										? [{ required, message: getPlaceholder(scheme) }]
										: undefined
								}
							>
								<DynamicForm {...scheme} />
							</Form.Item>
						)
					})}
				</Form>
			</DynamicFormProvider>
		)
	},
)
