import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutatations";
import { createFileRoute } from "@tanstack/react-router";
import type { Models } from "appwrite";

const Home = () => {
	const {
		data: posts,
		isPending: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();
	return (
		<div className="flex flex-1">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
					{isPostLoading && !posts && typeof posts === "undefined" ? (
						<Loader />
					) : (
						<ul className="flex flex-ocl flex-1 gap-9 w-full">
							{posts?.documents.map((post: Models.Document) => (
								<PostCard key={post.$id} post={post} />
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/_pages/")({
	component: Home,
});
