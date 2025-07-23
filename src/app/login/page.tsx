"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../ui/Button";

const LoginPage = () => {
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		await signIn("google");
	};

	return (
		<div className="h-screen w-full grid place-content-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				<Button
					type="submit"
					disabled={loading}
					aria-busy={loading}
				>
					Login with Google
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;
