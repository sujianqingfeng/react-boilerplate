import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css?url'
import type { LinksFunction } from '@remix-run/node'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
]

export function HydrateFallback() {
	return (
		<>
			<p>Loading...</p>
			<Scripts />
		</>
	)
}

export default function Component() {
	return (
		<>
			<Links />
			<Outlet />
			<Scripts />
		</>
	)
}
