import Link from "next/link";
import { verifySession } from "@/lib/session";
import SignOutButton from "../SignOutButton";

export default async function Header() {
  const session = await verifySession();
  const user = session?.user;

  return (
    <header>

        <h1>MiniTwit</h1>

        <nav className="navigation">
          {user ? (
            <>
              <Link href="/">my timeline</Link> |{" "}
              <Link href="/public">public timeline</Link> |{" "}
              <SignOutButton username={user.username} />
            </>
          ) : (
            <>
              <Link href="/public">public timeline</Link> |{" "}
              <Link href="/register">sign up</Link> |{" "}
              <Link href="/login">sign in</Link>
            </>
          )}
        </nav>

    </header>
  );
}
