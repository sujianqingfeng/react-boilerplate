import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/')({
	component: () => <div>Hello /admin/dashboard!</div>,
})
