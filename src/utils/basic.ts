export const createSafePromise = <R = any, T extends any[] = any[]>(
	promiseFn: (...rest: T) => Promise<R>,
) => {
	if (typeof promiseFn !== 'function') {
		throw new Error('createSafePromise: promiseFn should be a function')
	}

	return async (
		...rest: Parameters<typeof promiseFn>
	): Promise<{ data: R; error: null } | { data: null; error: any }> => {
		try {
			const data = await promiseFn(...rest)
			return { data, error: null }
		} catch (error) {
			return { data: null, error }
		}
	}
}

export function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

export function isPromise(obj: any): obj is Promise<any> {
	return !!obj && typeof obj.then === 'function'
}
