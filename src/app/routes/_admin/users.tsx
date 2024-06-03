import * as AntIcons from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import { Actions } from '~/components/ui/actions'
import { Scaffold } from '~/components/ui/scaffold'
import { useModalTemplate } from '~/hooks/use-modal'
import { useScaffold } from '~/hooks/use-scaffold'
import type { BasePageResp, UserResp } from '~/types/api'
import { sleep } from '~/utils/basic'

function Users() {
	const { showModal } = useModalTemplate({
		template: lazy(
			() => import('~/features/user/components/add-user-modal-template'),
		),
	})

	const { scaffoldProps } = useScaffold<UserResp>({
		queryConfig: {
			schemas: [
				{
					type: 'select',
					label: '姓名',
					field: 'username',
					componentProps: {
						options: [{ label: 'test', value: 'test' }],
					},
				},
				{
					type: 'api-select',
					label: '状态',
					field: 'status',
					componentProps: {
						queryKey: ['users-status'],
						queryFn: async () => {
							await sleep(2000)
							return [{ label: 'test', value: 'test' }]
						},
					},
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
					render: () => {
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
		},
		requestConfig: {
			queryKey: ['users'],
			queryFn: async (params, pagination) => {
				console.log('🚀 ~ queryFn ~ pagination:', pagination)
				console.log('🚀 ~ queryFn ~ params:', params)

				await sleep(2000)

				const r: BasePageResp<UserResp> = {
					data: {
						content: [
							{
								username: '1',
								age: 3,
								id: 1,
							},
						],
						total: 100,
					},
				}

				return r
			},
		},
		operationConfig: {
			actions: {
				list: [
					{
						title: '新建',
						type: 'primary',
						onClick: () => {
							showModal({
								title: '新建用户',
								showParams: {
									bbbb: '3333',
								},
								onOk({ close, result, update }) {
									update({
										confirmLoading: true,
									})
									console.log('🚀 ~ onOk ~ result:', result)
									close()
								},
							})
						},
					},
				],
			},
		},
	})

	return (
		<div className="h-full main-bg">
			<Scaffold {...scaffoldProps} />
		</div>
	)
}

export const Route = createFileRoute('/_admin/users')({
	component: Users,
	staticData: {
		title: 'Users',
		icon: AntIcons.DashboardOutlined,
		sort: 2,
	},
})
