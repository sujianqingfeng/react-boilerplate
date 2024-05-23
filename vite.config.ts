import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

export default defineConfig({
	plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
})
