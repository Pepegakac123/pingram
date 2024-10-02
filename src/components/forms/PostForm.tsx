import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { useCreatePost } from "@/lib/react-query/queriesAndMutatations";
type PostFormProps = {
	post?: Models.Document;
};
const PostForm = ({ post }: PostFormProps) => {
	const navigate = useNavigate();
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();
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
					>
						Prześlij
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default PostForm;
