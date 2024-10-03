import { Link } from "@tanstack/react-router";

const ErrorPage = () => {
	return (
		<div className="w-screen h-screen grid place-items-center">
			<div className="flex flex-col gap-y-4 justify-center align-center text-center">
				<h2 className="text-9xl text-primary-500 font-bold">404</h2>
				<p className="text-lg sm:text-2xl font-bold capitalize">
					Strony Nie Znaleziono.
					<Link to="/" className="text-primary-500 underline">
						Wróć do strony głównej
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
