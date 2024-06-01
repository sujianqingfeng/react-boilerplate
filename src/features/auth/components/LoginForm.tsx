import { useNavigate } from '@tanstack/react-router'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { Lock, User } from 'lucide-react'

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

export function LoginForm() {
	const navigate = useNavigate()

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values)
		navigate({
			to: '/',
		})
	}

	return (
		<>
			<p className="font-bold text-lg">Login</p>

			<Form
				className="mt-8"
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input prefix={<User color="#ccc" size={20} />} />
				</Form.Item>

				<Form.Item<FieldType>
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password prefix={<Lock color="#ccc" size={20} />} />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
