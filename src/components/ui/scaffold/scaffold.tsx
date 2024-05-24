import { ScaffoldQuery, type ScaffoldQueryProps } from './query'

export type ScaffoldProps = {
	queryConfig: Omit<ScaffoldQueryProps, 'form'>
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig } = props

	return (
		<>
			<ScaffoldQuery {...queryConfig} />
		</>
	)
}
