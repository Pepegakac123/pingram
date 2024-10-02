import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutatations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
const Topbar = () => {
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user } = useUserContext();
	const navigate = useNavigate();
	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (isSuccess) {
			navigate({ to: "/logowanie" });
			localStorage.clear();
		}
	}, [isSuccess]);

	return (
		<section className="topbar">
			<div className="flex-between py-4 px-5">
				<Link to="/" className="flex gap-3 items-center">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={130}
						height={325}
					/>
				</Link>
				<div className="flex gap-4">
					<Button
						variant="ghost"
						className="shad_button_ghost"
						onClick={() => signOut()}
					>
						<img src="/assets/icons/logout.svg" alt="logout" />
					</Button>
					<Link
						to="/profile/$profileId"
						params={{ profileId: user.id }}
						className="flex-center items-center"
					>
						<img
							src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
							alt="user"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};
export default Topbar;
