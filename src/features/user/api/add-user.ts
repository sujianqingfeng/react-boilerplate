import { api } from '~/lib/api-client'

export const addUser = async (email: string, password: string) => {
	return api.put('/user/add', { email, password })
}

export const useAddUser = () => {}
