import { Outlet, createFileRoute, Navigate } from "@tanstack/react-router";
const AuthLayout = () => {
	const isAuthenticated = false;

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<section className="flex flex-1 justify-center items-center flex-col py-10">
						<Outlet />
					</section>
					<img
						src="/assets/images/side-img.svg"
						alt="logo"
						className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
					/>
				</>
			)}
		</>
	);
};

export const Route = createFileRoute("/_auth")({
	// beforeLoad: ({ context }) => {
	// 	const isAuthenticated = useAuth();
	// 	if (!isAuthenticated) {
	// 		throw redirect({
	// 			to: "/login",
	// 			search: {
	// 				redirect: location.href,
	// 			},
	// 		});
	// 	}
	// },
	component: AuthLayout,
});
