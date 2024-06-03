import type { ButtonProps } from 'antd'
import { Button, Space } from 'antd'

type ListItem = ButtonProps & {
	title: string
	show?: () => boolean
}

export type ActionsProps = {
	spaceSize?: number
	defaultBtClassName?: string
	list: ListItem[]
}

export function Actions({
	list,
	spaceSize = 12,
	defaultBtClassName,
}: ActionsProps) {
	const showList = list.filter((item) => item.show?.() ?? true)

	return (
		<Space size={spaceSize}>
			{showList.map((item, index) => {
				const { title, className, ...rest } = item
				const _className = `${defaultBtClassName ?? ''} ${className}`
				return (
					<Button
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						{...rest}
						className={_className}
					>
						{title}
					</Button>
				)
			})}
		</Space>
	)
}
