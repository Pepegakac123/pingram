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
import { SignInValidationSchema } from "@/lib/validation";
import type { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutatations";
import { useUserContext } from "@/context/AuthContext"; //
import { getCurrentUser } from "@/lib/appwrite/api";
const SignInForm = () => {
	const { toast } = useToast();
	const { checkAuthUser } = Route.useLoaderData();
	const { isAuthenticated, setIsAuthenticated } = useUserContext(); // Add this line
	const { mutateAsync: signInAccount, isPending: isSigningIn } =
		useSignInAccount();

	const navigate = useNavigate();

	const form = useForm<z.infer<typeof SignInValidationSchema>>({
		resolver: zodResolver(SignInValidationSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SignInValidationSchema>) {
		try {
			const session = await signInAccount({
				email: values.email,
				password: values.password,
			});

			if (!session) {
				console.log("Session creation failed");
				toast({
					title: "Logowanie nie powiodło się, spróbuj ponownie",
				});
				return;
			}

			console.log("Session created successfully:", session);
			const currentUser = await getCurrentUser();
			console.log(currentUser);
			const isLoggedIn = await checkAuthUser();
			console.log("checkAuthUser result:", isLoggedIn);
			console.log("isAuthenticated state:", isAuthenticated);

			if (isLoggedIn) {
				setIsAuthenticated(true);
				form.reset();
				navigate({ to: "/" });

				const isLoggedIn = await checkAuthUser();
				if (isLoggedIn) {
					form.reset();
					navigate({
						to: "/",
					});
				} else {
					return toast({
						title: "Logowanie nie powiodło się. Spróbuj ponownie",
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex flex-center flex-col">
				<img src="/assets/images/logo.svg" alt="logo" />
				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Zaloguj Się</h2>
				<p className="text-light-3 small-medium md:base-regular text-center">
					Witamy z powrotem. Wprowadź dane, aby skorzystć z serwisu.
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5 w-full mt-4"
				>
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
						{isSigningIn ? (
							<div className="flex-center gap-2">
								<Loader /> Przesyłanie...
							</div>
						) : (
							"Zaloguj Się"
						)}
					</Button>
					<p className="text-small-regular text-light-2 text-center mt-2">
						Nie Posiadasz Konta?
						{
							<Link
								to="/rejestracja"
								className="text-primary-500 text-small-semibold ml-1"
							>
								Zarejestruj Się
							</Link>
						}
					</p>
				</form>
			</div>
		</Form>
	);
};

export const Route = createFileRoute("/_auth/logowanie")({
	component: SignInForm,
	loader: ({ context }) => {
		const { checkAuthUser, isLoading: isUserLoading } = context.userContext;
		return { checkAuthUser, isUserLoading };
	},
});
