import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginForm } from '~/features/auth/components/LoginForm'

function Login() {
	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="w-[700px] bg-white flex justify-start items-start">
				<div className="flex-1">
					<img src="https://picsum.photos/350/400" alt="" />
				</div>
				<div className="flex-1 p-4">
					<LoginForm />
				</div>
			</div>
		</div>
	)
}

export const Route = createLazyFileRoute('/login')({
	component: Login,
})
