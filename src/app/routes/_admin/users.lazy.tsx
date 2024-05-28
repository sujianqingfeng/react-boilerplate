import { createLazyFileRoute } from '@tanstack/react-router'
import { Actions } from '~/components/ui/actions'
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
				{ title: '姓名', dataIndex: 'username' },
				{ title: '年龄', dataIndex: 'age' },
				{
					title: '操作',
					key: 'action',
					render: (text, record) => {
						return (
							<Actions
								defaultBtClassName="p-0"
								list={[
									{ title: '编辑', type: 'link' },
									{
										title: '删除',
										type: 'link',
										danger: true,
									},
								]}
							/>
						)
					},
				},
			],
			dataSource: [{ username: 'user', age: 13, id: 1 }],
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
