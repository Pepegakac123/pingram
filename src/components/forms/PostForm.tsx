import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import type { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";
import {
	useCreatePost,
	useUpdatePost,
} from "@/lib/react-query/queriesAndMutatations";
type PostFormProps = {
	post?: Models.Document;
	action: "Utwórz" | "Edytuj";
};
const PostForm = ({ post, action }: PostFormProps) => {
	const navigate = useNavigate();
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();
	const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
		useUpdatePost();

	const { user } = useUserContext();
	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post?.caption : "",
			file: [],
			location: post ? post?.location : "",
			tags: post ? post.tags.join(",") : "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof PostValidation>) {
		if (post && action === "Edytuj") {
			const updatedPost = await updatePost({
				...values,
				postId: post.$id,
				imageId: post?.imageId,
				imageUrl: post?.imageUrl,
			});

			if (!updatedPost) {
				toast({ title: "Proszę Spróbować Ponownie" });
			}

			return navigate({
				to: "/posty/$postid",
				params: { postid: post.$id },
			});
		}

		const newPost = await createPost({
			...values,
			userId: user.id,
		});

		if (!newPost) {
			toast({
				title: "Prosze Spróbować ponownie",
			});
		}

		navigate({ to: "/" });
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-9 w-full max-w-5xl"
			>
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Opis</FormLabel>
							<FormControl>
								<Textarea
									className="shad-textarea custom-scrollbar"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dodaj Zdjęcia</FormLabel>
							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>
							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dodaj Lokalizację</FormLabel>
							<FormControl>
								<Input className="shad-input" type="text" {...field} />
							</FormControl>
							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dodaj Tagi (odzielone przecinakmi ", ")</FormLabel>
							<FormControl>
								<Input
									className="shad-input"
									type="text"
									placeholder="sztuka, nauka, malarstwo"
									{...field}
								/>
							</FormControl>
							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 items-center justify-end">
					<Button type="button" className="shad-button_dark_4">
						Anuluj
					</Button>
					<Button
						type="submit"
						className="shad-button_primary whitespace-nowrap"
						disabled={isLoadingCreate || isLoadingUpdate}
					>
						{isLoadingCreate || (isLoadingUpdate && "Ładowanie...")}
						{action} Post
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default PostForm;
