import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pages/utworz-post")({
	component: () => <div>Hello /_pages/utworz-post!</div>,
});
