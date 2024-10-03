import { createFileRoute } from "@tanstack/react-router";

const EditPost = () => {
	const { postid } = Route.useLoaderData();
	console.log(postid);
	return <div>Edytuj post</div>;
};

export const Route = createFileRoute("/_pages/edytuj-post/$postid")({
	component: EditPost,
	loader: ({ params: { postid } }) => {
		return { postid };
	},
});
