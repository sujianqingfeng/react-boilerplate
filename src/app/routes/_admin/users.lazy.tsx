import { createLazyFileRoute } from '@tanstack/react-router'
import { Scaffold } from '~/components/ui/scaffold'
import { useScaffold } from '~/hooks/use-scaffold'
import type { UserResp } from '~/types/api'

function Users() {
	const { scaffoldProps } = useScaffold<UserResp>({
		queryConfig: {
			schemas: [
				{
					type: 'select',
					label: '姓名',
					field: 'username',
					options: [{ label: 'test', value: 'test' }],
				},
				{
					type: 'input',
					label: '年龄',
					field: 'age',
				},
				{
					type: 'date-range',
					label: '时间',
					field: ['start', 'end'],
				},
			],
		},
		tableConfig: {
			columns: [
				{ title: '姓名', dataIndex: 'username', key: 'username' },
				{ title: '年龄', dataIndex: 'age', key: 'age' },
			],
			dataSource: [{ username: 'user', age: 13 }],
		},
	})

	return (
		<>
			<Scaffold {...scaffoldProps} />
		</>
	)
}

export const Route = createLazyFileRoute('/_admin/users')({
	component: Users,
})
