import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'

import { AppProvider } from './app-provider'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}

	interface StaticDataRouteOption {
		title?: string
		icon?: React.ForwardRefExoticComponent<any>
	}
}

// Render the app
const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
	<StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</StrictMode>,
)
