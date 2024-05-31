import { forwardRef, useImperativeHandle, type Ref } from 'react'
import type { ModalTemplateShowRef } from '~/hooks/use-modal'

export default forwardRef(function AddUserModalTemplate(
	_: any,
	ref: Ref<ModalTemplateShowRef<{ bbbb: string }, { test: string }>>,
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
