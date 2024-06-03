import { Layout } from 'antd'
import type { ReactNode } from 'react'
import { useLayout } from '~/hooks/use-layout'
import { TheFooter } from '../ui/the-footer'
import { TheHeader } from '../ui/the-header'
import { TheNav } from '../ui/the-nav'

const { Header, Footer, Sider, Content } = Layout

export function DefaultLayout({ children }: { children: ReactNode }) {
	const { collapsed, toggleCollapsed } = useLayout()

	return (
		<Layout className="h-full">
			<Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
				<TheNav collapsed={collapsed} />
			</Sider>
			<Layout>
				<Header className="main-bg px-0 h-12">
					<TheHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				</Header>
				<Content>
					<div className="p-4 h-full">
						<div className="h-full rounded-md overflow-y-auto">{children}</div>
					</div>
				</Content>
				<Footer className="p-0">
					<TheFooter />
				</Footer>
			</Layout>
		</Layout>
	)
}
