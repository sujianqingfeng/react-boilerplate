export type BaseResp<T> = {
	data: T
}

export type BasePageResp<T> = BaseResp<{
	content: T[]
	total: number
}>

export type UserResp = {
	username: string
	age: number
	id: number
}
