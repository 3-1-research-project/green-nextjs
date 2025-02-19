import Link from "next/link";
import { verifySession } from "@/lib/session";
import SignOutButton from "../buttons/SignOutButton";

export default async function Header() {
  const session = await verifySession()
  const user = session?.user;

  return (
    <div className="border-b dark:border-b-slate-800 shadow-md w-screen bg-white dark:bg-slate-900 dark:text-slate-100">
      <nav className="flex justify-between items-center h-20 max-w-7xl mx-auto px-2">

        <Link href={"/"}>
          <h2 className="font-bold text-lg">ITU Minitwit</h2>
        </Link>
        <ul className="flex justify-center items-center">
          {user ? (
            <SignOutButton username={user.username} />
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
