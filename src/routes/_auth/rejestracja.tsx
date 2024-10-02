import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidationSchema } from "@/lib/validation";
import type { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import {
	useCreateUserAccount,
	useSignInAccount,
} from "@/lib/react-query/queriesAndMutatations";
const SignupForm = () => {
	const { toast } = useToast();
	const { checkAuthUser, isUserLoading } = Route.useLoaderData();
	const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
		useCreateUserAccount();

	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	const navigate = useNavigate();

	const form = useForm<z.infer<typeof SignupValidationSchema>>({
		resolver: zodResolver(SignupValidationSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
		try {
			const newUser = await createUserAccount(values);
			if (!newUser) {
				return toast({
					title: "Rejestracja nie powiodła się, spróbuj ponownie",
				});
			}
			const session = await signInAccount({
				email: values.email,
				password: values.password,
			});

			if (!session) {
				toast({
					title: "Logowanie nie powiodło się, spróbuj ponownie",
				});
				navigate({ to: "/logowanie" });

				return;
			}
			const isLoggedIn = await checkAuthUser();
			if (isLoggedIn) {
				form.reset();
				navigate({
					to: "/",
				});
			} else {
				return toast({
					title: "Rejestracja się nie powiodła. Spróbuj ponownie",
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Utwórz Nowe Konto</h2>
				<p className="text-light-3 small-medium md:base-regular text-center">
					Aby skorzystać z pingrama, wprowadź proszę swoje dane
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imię</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="shad-input"
										placeholder="np: Jan"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nazwa Użytkownika</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="shad-input"
										placeholder="np: Jan321"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="text"
										className="shad-input"
										placeholder="np: Janek321@wp.pl"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hasło</FormLabel>
								<FormControl>
									<Input
										type="password"
										className="shad-input"
										placeholder="np: 04TWbwT3
"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isCreatingUser || isUserLoading || isUserLoading ? (
							<div className="flex-center gap-2">
								<Loader /> Przesyłanie...
							</div>
						) : (
							"Utwórz Konto"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Posiadasz juz konto?
						{
							<Link
								to="/logowanie"
								className="text-primary-500 text-small-semibold ml-1"
							>
								Zaloguj Się
							</Link>
						}
					</p>
				</form>
			</div>
		</Form>
	);
};

export const Route = createFileRoute("/_auth/rejestracja")({
	component: SignupForm,
	loader: ({ context }) => {
		const { checkAuthUser, isLoading: isUserLoading } = context.userContext;
		return { checkAuthUser, isUserLoading };
	},
});
