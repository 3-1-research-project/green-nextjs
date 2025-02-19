'use client'

import { register } from '@/app/actions/auth'
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
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <div>
        <label htmlFor="password2">Password2</label>
        <input id="password2" name="password2" type="password" />
      </div>
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}
