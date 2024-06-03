import type { GetProps } from 'antd'
import { DatePicker } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>

type DateRangeProps = {
	defaultValue?: [string, string]
	withEndTimeOfDay?: boolean
	onChange?: (dates: [string, string]) => void
}

function formatTime(time: Dayjs, withEndTimeOfDay: boolean) {
	return withEndTimeOfDay
		? time.endOf('day').format('YYYY-MM-DD HH:mm:ss')
		: time.format('YYYY-MM-DD HH:mm:ss')
}

export function DateRange({
	defaultValue: [start, end] = ['', ''],
	onChange,
	withEndTimeOfDay = true,
}: DateRangeProps) {
	const defaultValue: RangePickerProps['value'] = [
		start ? dayjs(start) : null,
		end ? dayjs(end) : null,
	]

	const rangePickerOnChange: RangePickerProps['onChange'] = (dates) => {
		if (!dates) {
			onChange?.(['', ''])
			return
		}

		const [start, end] = dates

		onChange?.([
			start ? formatTime(start, false) : '',
			end ? formatTime(end, withEndTimeOfDay) : '',
		])
	}

	return (
		<RangePicker
			placeholder={['开始时间', '结束时间']}
			defaultValue={defaultValue}
			onChange={rangePickerOnChange}
		/>
	)
}
