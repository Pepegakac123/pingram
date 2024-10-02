import BottomBar from "@/components/shared/BottomBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { R } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";
const RootLayout = () => {
	return (
		<div className="w-full md:flex">
			<Topbar />
			<LeftSidebar />
			<section className="flex flex-1 h-full">
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};

export const Route = createFileRoute("/_pages")({
	component: RootLayout,
});
