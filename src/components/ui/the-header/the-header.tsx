import { Button } from 'antd'
import * as AntIcons from '@ant-design/icons'
const { MenuFoldOutlined, MenuUnfoldOutlined } = AntIcons

type TheHeaderProps = {
	collapsed: boolean
	toggleCollapsed: () => void
}

export function TheHeader(props: TheHeaderProps) {
	const { collapsed, toggleCollapsed } = props
	return (
		<div className="flex justify-between items-center h-full px-2">
			<Button
				type="text"
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={toggleCollapsed}
			/>
		</div>
	)
}
