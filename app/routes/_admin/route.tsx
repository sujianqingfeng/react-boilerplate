import { Outlet } from '@remix-run/react'

export default function AdminLayout() {
	return (
		<>
			<div>header</div>
			<div>
				<Outlet />
			</div>

			<div>footer</div>
		</>
	)
}
