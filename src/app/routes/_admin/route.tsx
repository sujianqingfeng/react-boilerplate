import { Outlet } from '@remix-run/react'
import { DefaultLayout } from '~/components/layouts/default-layout'

export default function AdminLayout() {
	return (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>
	)
}
