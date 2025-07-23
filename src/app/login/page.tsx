import { signIn } from "@/auth";
import Button from "../ui/Button";

const LoginPage = () => {
	return (
		<div className="h-screen w-full grid place-content-center">
			<form
				action={async () => {
					"use server";
					await signIn("google");
				}}
			>
				<Button type="submit">Login with Google</Button>
			</form>
		</div>
	);
};

export default LoginPage;
