import { bottombarLinks } from "@/constants";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

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
						className={`${isActive && "bg-primary-500 rounded-sm"} flex-center flex-col gap-1 transition`}
						activeOptions={{ exact: true }}
						key={link.label}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							className={`${isActive && "invert-white"}`}
							width={16}
							height={16}
						/>
						<p className="tiny-medium text-light-2">{link.label}</p>
					</Link>
				);
			})}
		</section>
	);
};
export default BottomBar;
