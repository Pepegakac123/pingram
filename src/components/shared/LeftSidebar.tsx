import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutatations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import type { INavLink } from "@/types";
const LeftSidebar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user } = useUserContext();
	const router = useRouter();
	const pathname = router.state.location.pathname;
	console.log(pathname);
	const navigate = useNavigate();
	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (isSuccess) {
			navigate({ to: "/logowanie" });
			localStorage.clear();
		}
	}, [isSuccess]);
	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link to="/" className="flex gap-3 items-center">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={170}
						height={36}
					/>
				</Link>
				<Link
					to="/profile/$profileId"
					params={{ profileId: user.id }}
					className="flex gap-3 items-center"
				>
					<img
						src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
						alt="user"
						className="h-14 w-14 rounded-full"
					/>
					<div className="flex flex-col">
						<p className="body-bold">{user.name}</p>
						<p className="small-regular text-light-3">@{user.username}</p>
					</div>
				</Link>
				<ul className="flex flex-col gap-6">
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route;
						return (
							<li
								key={link.label}
								className={`leftsidebar-link ${isActive && "bg-primary-500"}`}
							>
								<Link
									to={link.route}
									className="flex gap-4 p-4 items-center capitalize group"
									activeOptions={{ exact: true }}
								>
									<img
										src={link.imgURL}
										alt={link.label}
										className={`group-hover:invert-white ${isActive && "invert-white"}`}
									/>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<Button
				variant="ghost"
				className="shad_button_ghost"
				onClick={() => signOut()}
			>
				<img src="/assets/icons/logout.svg" alt="logout" />
				<p className="small-medium lg:base-medium">Wyloguj</p>
			</Button>
		</nav>
	);
};
export default LeftSidebar;
