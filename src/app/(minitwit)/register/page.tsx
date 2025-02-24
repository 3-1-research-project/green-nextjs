'use client'

import { register } from '@/actions/auth'
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, undefined)
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/login')
    }
  }, [state, router]);


  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <form action={action} className="flex flex-col gap-3">
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              placeholder="Name"
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="border p-2 w-full rounded"
              required
              autoComplete="email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2 w-full rounded"
              required
              autoComplete="new-password"
            />
          </label>
          <label htmlFor="password2">
            Confirm Password
            <input
              id="password2"
              name="password2"
              type="password"
              placeholder="Confirm Password"
              className="border p-2 w-full rounded"
              required
              autoComplete="new-password"
            />
          </label>
        </fieldset>
        <button
          disabled={pending}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {pending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}