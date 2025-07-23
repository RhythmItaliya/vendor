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
		<>
			<main className="max-w-3xl mx-auto p-6 flex-1">
				<Header user={{ name: userName, image: userImage }} />
				<div>
					<Vendors />
				</div>
			</main>
			<footer className="w-full text-center text-xs text-gray-500 space-x-4 py-4 border-t bg-white fixed bottom-0 left-0">
				<a href="https://www.rhythmitaliya.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Personal Website</a>
				
				<a href="https://www.linkedin.com/in/rhythmitaliya/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
				
				<a href="https://github.com/rhythmitaliya" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Profile</a>
				
				<a href="https://github.com/RhythmItaliya/vendor#" target="_blank" rel="noopener noreferrer" className="hover:underline">Source Code (This Repo)</a>
			</footer>
		</>
	);
};

export default HomePage;
