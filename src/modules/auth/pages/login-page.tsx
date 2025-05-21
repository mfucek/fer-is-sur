import { LoginForm } from '../forms/login/login-form';

export const LoginPage = () => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="relative hidden lg:block m-4 rounded-xl overflow-hidden">
				<img
					src="/assets/images/abstract.jpg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover grayscale opacity-20 filter-[]"
				/>
			</div>

			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs flex flex-col gap-10">
						<div className="flex flex-col items-center justify-center">
							<h2 className="body-2 text-neutral-strong">Admin Login</h2>
							<h1 className="display-3 text-neutral">SUR</h1>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
};
