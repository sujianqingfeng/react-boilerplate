import type { ScaffoldProps } from '~/components/ui/scaffold'

export function useScaffold<Resp>(options: ScaffoldProps<Resp>) {
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
