import { type ReactNode, createContext, useContext } from 'react'
import type { FormInstance } from 'antd'

const DynamicFormInstanceContext = createContext<null | FormInstance>(null)

export function useDynamicFormInstance() {
	const form = useContext(DynamicFormInstanceContext)

	if (!form) {
		throw new Error('useDynamicForm must be used within DynamicFormProvider')
	}

	return form
}

type DynamicFormProviderProps = {
	children: ReactNode
	formInstance: FormInstance
}

export function DynamicFormProvider(props: DynamicFormProviderProps) {
	const { children, formInstance } = props

	return (
		<DynamicFormInstanceContext.Provider value={formInstance}>
			{children}
		</DynamicFormInstanceContext.Provider>
	)
}
