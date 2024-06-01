export function usePermission() {
	const has = (permissions: string[]) => {
		return permissions.length
	}

	return { has }
}
