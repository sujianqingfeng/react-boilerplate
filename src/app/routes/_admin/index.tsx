import * as AntIcons from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/')({
	component: () => <div>Hello /admin/dashboard!</div>,
	staticData: {
		title: 'Dashboard',
		icon: AntIcons.UserOutlined,
	},
})
