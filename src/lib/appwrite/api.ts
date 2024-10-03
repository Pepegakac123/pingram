import type { INewPost, INewUser } from "@/types";
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
