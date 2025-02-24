import { verifySession } from "@/lib/session";

export default async function PublicTimeline() {
  const session = await verifySession()
  const user = session?.user;
  return (
    <div>
      <h1>Public Timeline</h1>
      {user && (
        <p>You are logged in as {user.username}</p>
      )}
    </div>
  );
}
