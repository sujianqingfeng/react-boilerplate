import { Scaffold } from '~/components/ui/scaffold'
import { useScaffold } from '~/hooks/use-scaffold'

export default function Users() {
	const { scaffoldProps } = useScaffold({
		queryConfig: {
			schemas: [
				{
					type: 'select',
					label: 'Username',
					field: 'username',
					options: [{ label: 'test', value: 'test' }],
				},
			],
		},
	})

	return <Scaffold {...scaffoldProps} />
}
