import {
	Link,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import type { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	userContext: ReturnType<typeof useUserContext>;
}>()({
	component: App,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
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
		if (localStorage.getItem("cookieFallback") === "[]") {
			navigate({
				to: "/logowanie",
			});
		}

		checkAuthUser();
	}, []);
	return (
		<main className="flex h-screen">
			<Outlet />
			<Toaster />
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools position="bottom-right" />
		</main>
	);
}
