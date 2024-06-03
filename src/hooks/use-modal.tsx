import type { ModalProps } from 'antd'
import { ConfigProvider, Modal } from 'antd'
import { render, unmount } from 'rc-util/lib/React/render'
import {
	Suspense,
	useRef,
	type ForwardRefExoticComponent,
	type LazyExoticComponent,
	type RefAttributes,
} from 'react'
import { getTheme } from '~/config/theme'
import { useTheme } from '~/features/theme/hooks/use-theme'
import { isPromise } from '~/utils/basic'

export type ModalTemplateShowRef<P = any, R = any> = {
	show: (params: P) => void
	onOk?: () => R | Promise<R>
}

type ShowModalTemplateOptions<
	P,
	R,
	T extends ModalTemplateShowRef<P, R> = ModalTemplateShowRef<P, R>,
> = {
	showParams: Parameters<T['show']>[0]
	onOk?: (value: {
		close: () => void
		result: R
		update: (props: Pick<ModalProps, 'confirmLoading'>) => void
	}) => void
} & Omit<ModalProps, 'onOk' | 'confirmLoading'>

export function useModalTemplate<P = any, R = any>({
	template: TemplateComponent,
}: {
	template: LazyExoticComponent<
		ForwardRefExoticComponent<
			Omit<any, 'ref'> & RefAttributes<ModalTemplateShowRef<P, R>>
		>
	>
}) {
	const modalRef = useRef<ModalTemplateShowRef<P, R>>(null)
	const { isDarkMode } = useTheme()

	const showModal = (props: ShowModalTemplateOptions<P, R>) => {
		const { showParams, onOk, ...rest } = props
		const container = document.createDocumentFragment()

		const modalProps: ModalProps = {
			...rest,
			open: true,
			onOk: async () => {
				const r = modalRef.current?.onOk?.()
				if (isPromise(r)) {
					r.then((result) => {
						onOk?.({ close, result, update })
					})
					return
				}

				if (r !== undefined) {
					onOk?.({ close, result: r, update })
					return
				}

				close()
			},
			afterOpenChange: (open) => {
				if (open) {
					modalRef.current?.show(showParams)
				}
			},
			onCancel: (e) => {
				rest.onCancel?.(e)
				close()
			},
		}

		const renderModal = (props: ModalProps) => {
			render(
				<ConfigProvider theme={getTheme(isDarkMode)}>
					<Modal {...props}>
						<Suspense fallback={<p>loading</p>}>
							<TemplateComponent ref={modalRef} />
						</Suspense>
					</Modal>
				</ConfigProvider>,
				container,
			)
		}

		const destroy = () => {
			unmount(container)
		}

		const close = () => {
			renderModal({
				...modalProps,
				open: false,
				afterClose: () => {
					modalProps.afterClose?.()
					destroy()
				},
			})
		}

		const update = (props: Pick<ModalProps, 'confirmLoading'>) => {
			renderModal({
				...modalProps,
				...props,
			})
		}

		renderModal(modalProps)
	}

	return {
		showModal,
	}
}
