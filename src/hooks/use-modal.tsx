import type { ComponentType, LazyExoticComponent } from 'react'

type UseModalTemplateOptions<T extends ComponentType<any>> = {
	template: LazyExoticComponent<T>
}
export function useModalTemplate<T extends ComponentType<any>>(
	props: UseModalTemplateOptions<T>,
) {
	const { template } = props
}
