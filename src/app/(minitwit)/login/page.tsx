"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [state, action, pending] = useActionState(login, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.success && state?.user) {
            router.push("/");
        }
    }, [state, router]);

    return (
        <form action={action}>
            <input className="border" type="text" name="username" required />
            <input className="border" type="password" name="password" required />
            <button disabled={pending} type="submit">Login</button>
        </form>
    );
}