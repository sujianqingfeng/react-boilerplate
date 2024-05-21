import { Button, Layout } from 'antd'
import { useState, type ReactNode } from 'react'
import * as AntIcons from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout
const { MenuFoldOutlined, MenuUnfoldOutlined } = AntIcons

export function DefaultLayout({ children }: { children: ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)

	return (
		<Layout className="h-full">
			<Sider trigger={null} collapsible collapsed={collapsed}>
				Sider
			</Sider>
			<Layout>
				<Header className="bg-white p-0">
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
					/>
				</Header>
				<Content>{children}</Content>
				<Footer>Footer</Footer>
			</Layout>
		</Layout>
	)
}
