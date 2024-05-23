import type { FormSchema } from '../dynamic-form'
import { ScaffoldQuery, type ScaffoldQueryProps } from './query'

export type ScaffoldProps = {
	queryConfig: Omit<ScaffoldQueryProps, 'form'>
}

export function resolveForm(schemas: FormSchema[]) {
	const keys = schemas.flatMap((schema) => schema.field)

	return keys.reduce<Record<string, string>>((pre, key) => {
		pre[key] = ''
		return pre
	}, {})
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig } = props

	const form = resolveForm(queryConfig.schemas)

	return (
		<>
			<ScaffoldQuery {...queryConfig} form={form} />
		</>
	)
}
