import { useNavigate, useRouter } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

type MenuItem = Required<MenuProps>['items'][number] & { sort?: number }

function sortMenuItems(items: MenuItem[]) {
	return items.sort((a, b) => (a?.sort || 0) - (b?.sort || 0))
}

function useAdminMenuItems() {
	const router = useRouter()
	const items: MenuItem[] = []
	const adminLayout = router.routesById['/_admin']
	if (adminLayout && Array.isArray(adminLayout.children)) {
		for (const child of adminLayout.children) {
			const {
				fullPath,
				options: {
					staticData: { title, icon, sort },
				},
			} = child
			const IconComponent = icon
			items.push({
				key: fullPath,
				label: title,
				icon: IconComponent ? <IconComponent /> : null,
				sort,
			})
		}
	}

	const sortedItems = sortMenuItems(items)

	return {
		items: sortedItems,
	}
}

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

	const { items } = useAdminMenuItems()

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
