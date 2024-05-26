import { useMemo } from 'react'
import { useImmer } from 'use-immer'
import type { FormSchema } from '~/components/ui/dynamic-form'
import type {
	ScaffoldQueryProps,
	ScaffoldTableProps,
} from '~/components/ui/scaffold'

type UseScaffoldOptions<Resp> = {
	queryConfig: ScaffoldQueryProps
	tableConfig: ScaffoldTableProps<Resp>
}

export function useScaffold<Resp>(options: UseScaffoldOptions<Resp>) {
	// const [queryConfig, setQueryConfig] = useState(options.queryConfig)
	// const [queryConfig, setQueryConfig] = useImmer(options.queryConfig)
	// const { tableConfig } = options

	// const scaffoldProps = useMemo(
	// 	() => ({
	// 		queryConfig,
	// 		tableConfig,
	// 	}),
	// 	[queryConfig, tableConfig],
	// )

	// const setSchema = (field: string, schema: Partial<FormSchema>) => {
	// 	const index = queryConfig.schemas.findIndex(
	// 		(schema) => schema.field === field,
	// 	)

	// 	if (index === -1) {
	// 		throw new Error(`schema with field ${field} not found`)
	// 	}

	// 	setQueryConfig((draft) => {
	// 		Object.assign(draft.schemas[index], schema)
	// 	})
	// }

	return {
		scaffoldProps: options,
		// setSchema,
	}
}
