"use client";
import Image from "next/image";
import Button from "./Button";
import { logout } from "../_actions/logout";

export default function Header({ user }: { user: { name: string; image: string } }) {
  return (
    <header className="flex items-center gap-6 mb-8">
      <div className="rounded-full overflow-hidden w-16 h-16">
        <Image src={user.image} alt="profile picture" width={64} height={64} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-bold m-0">Hello! {user.name}</h1>
      </div>
      <form action={logout}>
        <Button type="submit" variant="red">Log Out</Button>
      </form>
    </header>
  );
} 