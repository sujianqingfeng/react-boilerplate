import { ScaffoldQuery, type ScaffoldQueryProps } from './query'

export type ScaffoldProps = {
	queryConfig: ScaffoldQueryProps
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig } = props
	return (
		<>
			<ScaffoldQuery {...queryConfig} />
			<div>scaffold</div>
		</>
	)
}
