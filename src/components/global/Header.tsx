import { useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import { useAuthStore } from "@/lib/store/auth";

async function getUsername(userId: string) {
  const res = await fetch(`/api/get-username?id=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error fetching username");
  }
  return res.json();
}

export default function Header() {
  const { userId, logout } = useAuthStore();
  const nextRouter = useRouter();

  async function handleSignOut() {
    await fetch("/api/logout");
    logout();
    nextRouter.push("/public");
  }

  return (
    <div className="border-b dark:border-b-slate-800 shadow-md w-screen fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 dark:text-slate-100">
      <nav className="flex justify-between items-center h-20 max-w-7xl mx-auto px-2">
        <div>
          <Link href={"/public"}>
            <h2 className="font-bold text-lg">ITU Minitwit</h2>
          </Link>
          {userId && (
            <Suspense fallback={<span></span>}>
              <Username userId={userId} />
            </Suspense>
          )}
        </div>
        <ul className="flex justify-center items-center">
          {userId ? (
            <>
              {/* Replace with dynamic routing based on your authenticated routes */}
              <li
                className="mx-2 hover:underline cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out
              </li>
            </>
          ) : (
            <li className="mx-2 hover:underline">
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

async function Username({ userId }: { userId: string }) {
  const username = await getUsername(userId);

  return <span>Welcome: {username}</span>;
}
