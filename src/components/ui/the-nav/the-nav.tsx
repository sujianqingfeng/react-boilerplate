import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter, useNavigate } from '@tanstack/react-router'
import * as AntIcons from '@ant-design/icons'
const { SettingOutlined } = AntIcons

type MenuItem = Required<MenuProps>['items'][number]

type TheNavProps = {
	collapsed: boolean
}

export function TheNav(props: TheNavProps) {
	const { collapsed } = props

	const router = useRouter()
	console.log('🚀 ~ TheNav ~ state:', router.routeTree)
	const navigate = useNavigate()

	const onClick: MenuProps['onClick'] = (e) => {
		navigate({
			to: e.key,
		})
	}

	const items: MenuItem[] = [
		{
			key: '/',
			label: 'Dashboard',
			icon: <SettingOutlined />,
		},
		{
			key: '/users',
			label: 'Users',
			icon: <SettingOutlined />,
		},
	]

	return (
		<>
			<div className="dark:text-white text-xl font-bold text-center p-4">
				{collapsed ? 'RB' : 'React Boilerplate'}
			</div>

			<Menu
				onClick={onClick}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				items={items}
			/>
		</>
	)
}
