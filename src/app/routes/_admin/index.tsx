import * as AntIcons from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { ExampleLineChart } from '~/features/dashboard/components/example-line-chart'
import { ExamplePieChart } from '~/features/dashboard/components/example-pie-chart'

function Dashboard() {
	return (
		<div className="h-full space-y-4">
			<div className="flex gap-4">
				<div className="bg-white flex-auto rounded-md p-4">
					<p className="text-lg font-bold">Title</p>
					<div className="text-4xl">$100</div>
				</div>
				<div className="bg-white flex-auto rounded-md p-4">
					<p className="text-lg font-bold">Title</p>
					<div className="text-4xl">$100</div>
				</div>
				<div className="bg-white flex-auto rounded-md p-4">
					<p className="text-lg font-bold">Title</p>
					<div className="text-4xl">$100</div>
				</div>
				<div className="bg-white flex-auto rounded-md p-4">
					<p className="text-lg font-bold">Title</p>
					<div className="text-4xl">$100</div>
				</div>
			</div>
			<div className="flex gap-4">
				<div className="bg-white flex-1 rounded-md p-4 flex justify-center items-center">
					<ExamplePieChart />
				</div>
				<div className="bg-white flex-1 rounded-md p-4 flex justify-center items-center">
					<ExamplePieChart />
				</div>

				<div className="bg-white flex-1 rounded-md p-4 flex justify-center items-center">
					<ExamplePieChart />
				</div>
			</div>
			<div className="bg-white p-4 rounded-md">
				<ExampleLineChart />
			</div>
		</div>
	)
}

export const Route = createFileRoute('/_admin/')({
	component: Dashboard,
	staticData: {
		title: 'Dashboard',
		icon: AntIcons.UserOutlined,
		sort: 1,
	},
})
