import { ScaffoldQuery, type ScaffoldQueryProps } from './query'
import { ScaffoldTable } from './table'

export type ScaffoldProps = {
	queryConfig: Omit<ScaffoldQueryProps, 'form'>
}

export function Scaffold(props: ScaffoldProps) {
	const { queryConfig } = props

	return (
		<>
			<ScaffoldQuery {...queryConfig} />

			<ScaffoldTable dataSource={[]} columns={[]} />
		</>
	)
}
