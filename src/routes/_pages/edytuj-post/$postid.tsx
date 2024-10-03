import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutatations";
import { createFileRoute } from "@tanstack/react-router";

const EditPost = () => {
	const { postid } = Route.useLoaderData();
	const { data: post, isPending } = useGetPostById(postid || "");

	if (isPending) return <Loader />;

	return (
		<div className="flex flex-1">
			<div className="common-container">
				<div className="max-w-5xl flex-start gap-3 justify-start w-full">
					<img
						src="/assets/icons/add-post.svg"
						width={36}
						height={36}
						alt="add"
					/>
					<h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
				</div>

				<PostForm action="Edytuj" post={post} />
			</div>
		</div>
	);
};

export const Route = createFileRoute("/_pages/edytuj-post/$postid")({
	component: EditPost,
	loader: ({ params: { postid } }) => {
		return { postid };
	},
});
