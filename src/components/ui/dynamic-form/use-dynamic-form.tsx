import type { FormInstance } from 'antd'
import { createContext, useContext, type ReactNode } from 'react'

const DynamicFormInstanceContext = createContext<null | FormInstance>(null)

export function useDynamicFormInstance() {
	const form = useContext(DynamicFormInstanceContext)

	if (!form) {
		throw new Error(
			'useDynamicFormInstance must be used within DynamicFormProvider',
		)
	}

	return form
}

type DynamicFormProviderProps = {
	children: ReactNode
	formInstance: FormInstance
}

export function DynamicFormProvider({
	children,
	formInstance,
}: DynamicFormProviderProps) {
	return (
		<DynamicFormInstanceContext.Provider value={formInstance}>
			{children}
		</DynamicFormInstanceContext.Provider>
	)
}
