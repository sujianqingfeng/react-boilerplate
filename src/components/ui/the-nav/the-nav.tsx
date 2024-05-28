import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useRouter } from '@tanstack/react-router'
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

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e)
	}

	const items: MenuItem[] = [
		{
			key: 'sub4',
			label: 'Navigation Three',
			icon: <SettingOutlined />,
			children: [
				{ key: '9', label: 'Option 9' },
				{ key: '10', label: 'Option 10' },
				{ key: '11', label: 'Option 11' },
				{ key: '12', label: 'Option 12' },
			],
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
