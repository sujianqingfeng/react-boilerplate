import { requestPost } from './api-client'

export const login = async (email: string, password: string) => {
	return requestPost('/auth/login', { email, password })
}
