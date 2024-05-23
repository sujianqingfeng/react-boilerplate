import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { DefaultLayout } from '~/components/layouts/default-layout'

function AdminLayout() {
	return (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>
	)
}

export const Route = createLazyFileRoute('/_admin')({
	component: AdminLayout,
})
