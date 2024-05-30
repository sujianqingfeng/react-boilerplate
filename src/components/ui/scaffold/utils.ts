import type { FormSchema } from '../dynamic-form'

export function getKey(field: FormSchema['field']) {
	return Array.isArray(field) ? field.join('-') : field
}

export function mapFields(
	schemas: FormSchema[],
	values: Record<string, string>,
) {
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
