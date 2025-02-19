'use client';

import { logout } from "@/app/actions/auth";

export default function SignOutButton({ username }: { username: string }) {
    const handleSignOut = async () => {
        await logout();
        window.location.reload();
    };
    return (
        <button onClick={handleSignOut}>
            Sign Out [{username}]
        </button>
    )
}