import { bottombarLinks } from "@/constants";
import { Link, useRouter } from "@tanstack/react-router";

const BottomBar = () => {
	const router = useRouter();
	const pathname = router.state.location.pathname;
	return (
		<section className="bottom-bar">
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route;
				return (
					<Link
						to={link.route}
						className={`${isActive && "rounded-[10px] bg-primary-500"} flex-center flex-col gap-1 p-2 transition`}
						activeOptions={{ exact: true }}
						activeProps={{ className: "bg-primary-500" }}
						key={link.label}
					>
						{({ isActive }) => {
							return (
								<>
									<img
										src={link.imgURL}
										alt={link.label}
										className={`${isActive && "invert-white"}`}
										width={16}
										height={16}
									/>
									<p className="tiny-medium text-light-2">{link.label}</p>
								</>
							);
						}}
					</Link>
				);
			})}
		</section>
	);
};
export default BottomBar;
