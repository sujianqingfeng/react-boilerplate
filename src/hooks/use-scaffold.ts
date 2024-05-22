import { useMemo, useState } from 'react'
import type { ScaffoldQueryProps } from '~/components/ui/scaffold'

type UseScaffoldOptions = {
	queryConfig: ScaffoldQueryProps
}

export function useScaffold(options: UseScaffoldOptions) {
	const [queryConfig, setQueryConfig] = useState(options.queryConfig)

	const scaffoldProps = useMemo(
		() => ({
			queryConfig,
		}),
		[queryConfig],
	)

	return {
		scaffoldProps,
	}
}
