import type { FormInstance } from 'antd'
import { createContext, useContext, type ReactNode } from 'react'
import type { FormSchema } from '../../dynamic-form'
import { mapFields } from '../../dynamic-form/utils'

type ScaffoldContextType = null | {
	formInstance: FormInstance
	schemas: FormSchema[]
}

const ScaffoldContext = createContext<ScaffoldContextType>(null)

type ScaffoldProviderProps = {
	children: ReactNode
	value: ScaffoldContextType
}
export function ScaffoldProvider({ children, value }: ScaffoldProviderProps) {
	return (
		<ScaffoldContext.Provider value={value}>
			{children}
		</ScaffoldContext.Provider>
	)
}

export function useScaffoldContext() {
	const context = useContext(ScaffoldContext)
	if (!context) {
		throw new Error('useScaffold must be used within a ScaffoldProvider')
	}

	const { formInstance, schemas } = context

	const getFieldsValue = () => {
		const values = formInstance.getFieldsValue()
		return mapFields(schemas, values)
	}

	return {
		formInstance,
		schemas,
		getFieldsValue,
	}
}
