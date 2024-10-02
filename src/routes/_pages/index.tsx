import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutatations";
import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
	const {
		data: posts,
		isPending: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();
	console.log(posts);
	return (
		<div className="flex flex-1">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
					{isPostLoading && !posts && typeof posts === "undefined" ? (
						<Loader />
					) : (
						<ul>{posts?.total < 1 && <p>No posts yet</p>}</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/_pages/")({
	component: Home,
});
