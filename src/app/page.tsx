import { auth } from "@/auth";
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic'
import Header from "./ui/Header";

const Vendors = dynamic(() => import('./vendors/page'), { ssr: false });

const HomePage = async () => {
	const session = await auth();
	if (!session) return notFound();
	
	const userName = session.user.name || "User";
	const userImage = session.user.image || "https://ui-avatars.com/api/?name=User";

	return (
		<main className="max-w-3xl mx-auto p-6">
			<Header user={{ name: userName, image: userImage }} />
			<div>
				<Vendors />
			</div>
		</main>
	);
};

export default HomePage;
