import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import type { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import ErrorPage from "@/components/shared/ErrorPage";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	userContext: ReturnType<typeof useUserContext>;
}>()({
	component: App,
	notFoundComponent: ErrorPage,
	loader: ({ context }) => {
		const { checkAuthUser } = context.userContext;
		return { checkAuthUser };
	},
});

function App() {
	const navigate = useNavigate();
	const { checkAuthUser } = Route.useLoaderData();
	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const cookieFallback = localStorage.getItem("cookieFallback");
		if (
			cookieFallback === "[]" ||
			cookieFallback === null ||
			cookieFallback === undefined
		) {
			navigate({ to: "/logowanie" });
		}

		checkAuthUser();
	}, []);
	return (
		<main className="flex h-screen">
			<Outlet />
			<Toaster />
			<ReactQueryDevtools buttonPosition="top-right" initialIsOpen={false} />
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
		</main>
	);
}
