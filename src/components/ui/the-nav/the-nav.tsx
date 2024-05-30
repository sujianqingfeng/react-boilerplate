import * as AntIcons from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
const { SettingOutlined } = AntIcons

type MenuItem = Required<MenuProps>['items'][number]

type TheNavProps = {
	collapsed: boolean
}

export function TheNav(props: TheNavProps) {
	const { collapsed } = props
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
			<div className="dark:text-white text-xl font-bold text-center p-4 whitespace-nowrap text-ellipsis">
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
