import { forwardRef, useImperativeHandle, type Ref } from 'react'
import type { ModalTemplateShowRef } from '~/hooks/use-modal'

export type AddUserModalTemplateShowParams = {
	bbbb: string
}

export default forwardRef(function AddUserModalTemplate(
	_: any,
	ref: Ref<
		ModalTemplateShowRef<AddUserModalTemplateShowParams, { test: string }>
	>,
) {
	useImperativeHandle(ref, () => {
		return {
			show({ bbbb }) {
				console.log('🚀 ~ show ~ show:,', bbbb)
			},
			onOk() {
				return {
					test: 'ss',
				}
			},
		}
	})

	return <div>AddUserModalTemplate</div>
})
