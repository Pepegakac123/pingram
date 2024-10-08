import type { INewPost, INewUser, IUpdatePost } from "@/types";
import { ID, ImageGravity, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name,
		);
		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(user.name);
		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			email: newAccount.email,
			name: newAccount.name,
			imageUrl: avatarUrl,
			username: user.username,
		});
		return newUser;
	} catch (error) {
		return error;
	}
}

// Save user to database
export async function saveUserToDB(user: {
	accountId: string;
	email: string;
	name: string;
	imageUrl: URL;
	username?: string;
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user,
		);
		return newUser;
	} catch (error) {
		console.log(error);
	}
}

export async function signInAccount(user: { email: string; password: string }) {
	try {
		const session = await account.createEmailPasswordSession(
			user.email,
			user.password,
		);
		return session;
	} catch (error) {
		console.log(error);
	}
}

export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		console.log(error);
	}
}

export async function getCurrentUser() {
	try {
		// console.log("Getting current account...");
		const currentAccount = await getAccount();
		// console.log("Current account:", currentAccount);

		if (!currentAccount) {
			console.log("No one is logged in");
			return null;
		}

		// console.log("Fetching user document...");
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)],
		);

		// console.log("User document query result:", currentUser);

		if (!currentUser || currentUser.documents.length === 0) {
			console.log("No user document found");
			return null;
		}

		// console.log("Returning user document:", currentUser.documents[0]);
		return currentUser.documents[0];
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		return null;
	}
}

// ============================== SIGN OUT
export async function signOutAccount() {
	try {
		const session = await account.deleteSession("current");

		return session;
	} catch (error) {
		console.log(error);
	}
}

export async function createPost(post: INewPost) {
	try {
		// Upload file to appwrite storage
		const uploadedFile = await uploadFile(post.file[0]);

		if (!uploadedFile) throw Error;

		// Get file url
		const fileUrl = getFilePreview(uploadedFile.$id);
		if (!fileUrl) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		// Convert tags into array
		const tags = post.tags?.replace(/ /g, "").split(",") || [];

		// Create post
		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			ID.unique(),
			{
				creator: post.userId,
				caption: post.caption,
				imageUrl: fileUrl,
				imageId: uploadedFile.$id,
				location: post.location,
				tags: tags,
			},
		);

		if (!newPost) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		return newPost;
	} catch (error) {
		console.log(error);
	}
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
	try {
		const uploadedFile = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			file,
		);

		return uploadedFile;
	} catch (error) {
		console.log(error);
	}
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
	try {
		const fileUrl = storage.getFilePreview(
			appwriteConfig.storageId,
			fileId,
			2000,
			2000,
			ImageGravity.Top,
			100,
		);

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error) {
		console.log(error);
	}
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
	try {
		await storage.deleteFile(appwriteConfig.storageId, fileId);

		return { status: "ok" };
	} catch (error) {
		console.log(error);
	}
}

// Getting Posts

export async function getRecentPost() {
	const posts = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.postsCollectionId,
		[Query.orderDesc("$createdAt"), Query.limit(20)],
	);
	if (!posts) throw Error;
	return posts;
}

// Like post

export async function likePost(postId: string, likesArray: string[]) {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			postId,
			{
				likes: likesArray,
			},
		);
		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

// save post

export async function savePost(postId: string, userId: string) {
	try {
		const updatedPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			ID.unique(),
			{
				user: userId,
				post: postId,
			},
		);
		if (!updatedPost) throw Error;

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

//delete saved post

export async function deleteSavedPost(savedRecordId: string) {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			savedRecordId,
		);
		if (!statusCode) throw Error;

		return { status: "ok" };
	} catch (error) {
		console.log(error);
	}
}

export async function getPostById(postId: string) {
	try {
		const post = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			postId,
		);
		if (!post) throw Error;

		return post;
	} catch (error) {
		console.log(error);
	}
}

// Updating post
export async function updatePost(post: IUpdatePost) {
	const hasFileToUpdate = post.file.length > 0;
	try {
		let image = {
			imageUrl: post.imageUrl,
			imageId: post.imageId,
		};
		if (hasFileToUpdate) {
			const uploadedFile = await uploadFile(post.file[0]);
			if (!uploadedFile) throw Error;

			// Get file url
			const fileUrl = getFilePreview(uploadedFile.$id);
			if (!fileUrl) {
				await deleteFile(uploadedFile.$id);
				throw Error;
			}
			image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
		}

		// Convert tags into array
		const tags = post.tags?.replace(/ /g, "").split(",") || [];

		// Create post
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			post.postId,
			{
				caption: post.caption,
				imageUrl: image.imageUrl,
				imageId: image.imageId,
				location: post.location,
				tags: tags,
			},
		);

		if (!updatedPost) {
			await deleteFile(post.imageId);
			throw Error;
		}

		return updatedPost;
	} catch (error) {
		console.log(error);
	}
}

export async function deletePost(postId: string, imageId: string) {
	if (!postId || !imageId) throw Error;

	try {
		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			postId,
		);

		return { status: "ok" };
	} catch (error) {
		console.log(error);
	}
}

export async function searchPosts(searchTerm: string) {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			[Query.search("caption", searchTerm)],
		);

		if (!posts) throw Error;

		return posts;
	} catch (error) {
		console.log(error);
	}
}
export async function getInfinitePosts({
	pageParam,
}: { pageParam: number | null }) {
	const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(10)];

	if (pageParam && pageParam > 1) {
		// Pobierz ID ostatniego dokumentu z poprzedniej strony
		const previousPagePosts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			[Query.orderDesc("$updatedAt"), Query.limit((pageParam - 1) * 10)],
		);
		const lastId =
			previousPagePosts.documents[previousPagePosts.documents.length - 1].$id;
		queries.push(Query.cursorAfter(lastId));
	}

	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postsCollectionId,
			queries,
		);

		if (!posts) throw Error;
		return posts;
	} catch (error) {
		console.log(error);
		throw error; // Rzucamy błąd, aby React Query mógł go obsłużyć
	}
}
