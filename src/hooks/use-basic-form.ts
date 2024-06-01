import { useRef } from 'react'
import type { BasicFormProps, BasicFormRef } from '~/components/ui/basic-form'

export function registerBasicForm(props: BasicFormProps) {
	return {
		...props,
	}
}

export function useBasicForm() {
	const basicFormRef = useRef<BasicFormRef>(null)

	return {
		basicFormRef,
	}
}
