import * as AntIcons from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown } from 'antd'
import { ThemeSwitcher } from '~/features/theme/components/switcher'

const { MenuFoldOutlined, MenuUnfoldOutlined } = AntIcons

function MenuItemLabel(props: { label: string; onClick?: () => void }) {
	const { label, onClick } = props
	return (
		<button type="button" onClick={onClick}>
			{label}
		</button>
	)
}

type TheHeaderProps = {
	collapsed: boolean
	toggleCollapsed: () => void
}

export function TheHeader({ collapsed, toggleCollapsed }: TheHeaderProps) {
	const navigate = useNavigate()

	const items: MenuProps['items'] = [
		{
			key: 'logout',
			label: MenuItemLabel({
				label: 'logout',
				onClick: () => {
					navigate({
						to: '/login',
					})
				},
			}),
		},
	]

	return (
		<div className="flex justify-between items-center h-full px-4">
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={toggleCollapsed}
			/>
			<div className="flex justify-start items-center gap-2">
				<ThemeSwitcher />
				<Dropdown menu={{ items }}>
					<Avatar>U</Avatar>
				</Dropdown>
			</div>
		</div>
	)
}
