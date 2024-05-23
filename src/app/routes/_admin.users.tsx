import { Button } from 'antd'
import { Scaffold } from '~/components/ui/scaffold'
import { useScaffold } from '~/hooks/use-scaffold'

export default function Users() {
	const { scaffoldProps, setSchema } = useScaffold({
		queryConfig: {
			schemas: [
				{
					type: 'select',
					label: '姓名',
					field: 'username',
					options: [{ label: 'test', value: 'test' }],
				},
			],
		},
	})

	const onTest = () => {
		setSchema('username', {
			options: [{ label: 'test2', value: 'test2' }],
		})
	}

	return (
		<>
			<Button onClick={onTest}>test</Button>
			<Scaffold {...scaffoldProps} />
		</>
	)
}
