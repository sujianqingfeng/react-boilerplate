import { useMemo, useState } from 'react'
import { useImmer } from 'use-immer'
import type { FormSchema, FormSelectSchema } from '~/components/ui/dynamic-form'
import type { ScaffoldQueryProps } from '~/components/ui/scaffold'

type UseScaffoldOptions = {
	queryConfig: ScaffoldQueryProps
}

export function useScaffold(options: UseScaffoldOptions) {
	// const [queryConfig, setQueryConfig] = useState(options.queryConfig)
	const [queryConfig, setQueryConfig] = useImmer(options.queryConfig)

	const scaffoldProps = useMemo(
		() => ({
			queryConfig,
		}),
		[queryConfig],
	)

	const setSchema = (field: string, schema: Partial<FormSchema>) => {
		const index = queryConfig.schemas.findIndex(
			(schema) => schema.field === field,
		)

		if (index === -1) {
			throw new Error(`schema with field ${field} not found`)
		}

		setQueryConfig((draft) => {
			Object.assign(draft.schemas[index], schema)
		})
	}

	return {
		scaffoldProps,
		setSchema,
	}
}
