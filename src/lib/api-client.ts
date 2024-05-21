import {
	createAxios,
	createErrorMessageInterceptor,
	createExtractDataInterceptor,
	createFilterEmptyInterceptor,
	createInnerRequestInterceptor,
	createSerializeInterceptor,
	createInnerResponseInterceptor,
} from '@sujian/request'
import { createSafePromise } from '~/utils/basic'

const request = createAxios({
	baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
	},
})

const headerInterceptor = createInnerRequestInterceptor([
	(config) => {
		const token = localStorage.getItem('')
		if (config.headers && token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
])

const errorMessageInterceptor = createErrorMessageInterceptor({
	isInvalid(res) {
		const { code, msg } = res.data || {}
		const isValid = ['4201', '4202'].includes(code)
		if (!isValid) {
			return msg
		}
	},
	showMessage(msg) {
		console.log('msg', msg)
	},
})

const extractDataInterceptor = createExtractDataInterceptor({
	extract(res) {
		const { data } = res.data || {}
		return data
	},
})

const redirectInterceptor = createInnerResponseInterceptor([
	(res) => Promise.resolve(res),
	(error) => {
		if (error.response?.data?.code === '-1') {
			localStorage.removeItem('')

			const url = `${location.protocol}//${location.host}${
				import.meta.env.BASE_URL
			}/#/login`
			window.location.href = url
		}
		return Promise.reject(error)
	},
])

request
	.useReqInterceptor(
		headerInterceptor,
		createFilterEmptyInterceptor(),
		createSerializeInterceptor(),
	)
	.useRespInterceptor(
		redirectInterceptor,
		errorMessageInterceptor,
		extractDataInterceptor,
	)

export const requestGet = createSafePromise(request.get)
export const requestPost = createSafePromise(request.post)
export const requestDelete = createSafePromise(request.delete)
export const requestPut = createSafePromise(request.put)
export const api = request
