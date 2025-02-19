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
        <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            <form action={action} className="flex flex-col gap-3">
                <label htmlFor="username">
                    Username
                    <input
                        id="username"
                        className="border p-2 w-full rounded"
                        type="text"
                        name="username"
                        required
                        autoComplete="username"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        id="password"
                        className="border p-2 w-full rounded"
                        type="password"
                        name="password"
                        required
                        autoComplete="current-password"
                    />
                </label>
                <button
                    disabled={pending}
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {pending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}