import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import type { GetProps } from 'antd'

const { RangePicker } = DatePicker

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

type DateRangeProps = {
	start?: Dayjs
	end?: Dayjs
	withEndTimeOfDay?: boolean
}

export function DateRange(props: DateRangeProps) {
	const { start, end } = props

	const onChange: RangePickerProps['onChange'] = (dates) => {
		console.log('🚀 ~ DateRange ~ dates:', dates)
	}
	return <RangePicker value={[start, end]} onChange={onChange} />
}
