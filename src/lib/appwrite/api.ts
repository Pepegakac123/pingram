import type { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
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
