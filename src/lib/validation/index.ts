import * as z from "zod";

export const SignupValidationSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Imię musi składać się z minimum 2 znaków." }),
	username: z.string().min(2, {
		message: "Nazwa Użytkownika musi składać się z minimum 2 znaków.",
	}),
	email: z.string().email({ message: "Niepoprawny adres email." }),
	password: z
		.string()
		.min(8, { message: "Hasło musi składać się z minimum 8 znaków." }),
});
export const SignInValidationSchema = z.object({
	email: z.string().email({ message: "Niepoprawny adres email." }),
	password: z
		.string()
		.min(8, { message: "Hasło musi składać się z minimum 8 znaków." }),
});
export const PostValidation = z.object({
	caption: z.string().min(5).max(2500),
	file: z.custom<File[]>(),
	location: z.string().min(2).max(100),
	tags: z.string(),
});
