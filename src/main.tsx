import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { routeTree } from "./routeTree.gen";
import AuthProvider, { useUserContext } from "./context/AuthContext";

// Create new query client
const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		queryClient,
		userContext: undefined!,
	},
	defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Create a wrapper component to use the context
function AppWithProvider() {
	return (
		<AuthProvider>
			<AppWithRouter />
		</AuthProvider>
	);
}

function AppWithRouter() {
	const userContext = useUserContext();

	return (
		<RouterProvider router={router} context={{ queryClient, userContext }} />
	);
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<QueryClientProvider client={queryClient}>
			<AppWithProvider />
		</QueryClientProvider>,
	);
}
