import { forwardRef, useImperativeHandle, type Ref } from 'react'
import { BasicForm } from '~/components/ui/basic-form'
import { registerBasicForm, useBasicForm } from '~/hooks/use-basic-form'
import type { ModalTemplateShowRef } from '~/hooks/use-modal'

export default forwardRef(function AddUserModalTemplate(
	_: any,
	ref: Ref<ModalTemplateShowRef<{ bbbb: string }, { test: string }>>,
) {
	const { basicFormRef } = useBasicForm()

	useImperativeHandle(ref, () => {
		return {
			show({ bbbb }) {
				console.log('🚀 ~ show ~ show:,', bbbb)
			},
			async onOk() {
				const values = await basicFormRef.current?.validateFields()
				console.log('🚀 ~ onOk ~ values:', values)
				return {
					test: 'ss',
				}
			},
		}
	})

	const basicFormProps = registerBasicForm({
		schemas: [
			{
				type: 'input',
				field: 'name',
				label: '用户名',
				required: true,
			},
			{
				type: 'select',
				field: 'role',
				label: '角色',
				required: true,
				componentProps: {
					options: [
						{ label: '管理员', value: 'admin' },
						{ label: '普通用户', value: 'user' },
					],
				},
			},
		],
	})

	return (
		<div>
			<BasicForm {...basicFormProps} ref={basicFormRef} />
		</div>
	)
})
