import { DatePicker } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import type { GetProps } from 'antd'

const { RangePicker } = DatePicker

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

type DateRangeProps = {
	start?: string
	end?: string
	withEndTimeOfDay?: boolean
	onChange?: (value: { start: string; end: string }) => void
}

function formatTime(time: Dayjs, withEndTimeOfDay: boolean) {
	return withEndTimeOfDay
		? time.endOf('day').format('YYYY-MM-DD HH:mm:ss')
		: time.format('YYYY-MM-DD HH:mm:ss')
}

export function DateRange(props: DateRangeProps) {
	const { start, end, onChange, withEndTimeOfDay = true } = props

	const value: RangePickerProps['value'] = [
		start ? dayjs(start) : null,
		end ? dayjs(end) : null,
	]

	const rangePickerOnChange: RangePickerProps['onChange'] = (dates) => {
		if (!dates) {
			onChange?.({
				start: '',
				end: '',
			})
			return
		}

		const [start, end] = dates

		onChange?.({
			start: start ? formatTime(start, false) : '',
			end: end ? formatTime(end, withEndTimeOfDay) : '',
		})
	}

	return <RangePicker value={value} onChange={rangePickerOnChange} />
}
