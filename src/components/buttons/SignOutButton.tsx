'use client';

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function SignOutButton({ username }: { username: string }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await logout();
        router.push("/");
    };
    return (
        <button onClick={handleSignOut}>
            Sign Out [{username}]
        </button>
    )
}