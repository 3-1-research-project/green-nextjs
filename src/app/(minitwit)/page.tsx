import { useAuthStore } from "@/lib/store/auth";

export default function PublicTimeline() {
  const { isAuthenticated, userId } = useAuthStore();
  return (
    <div>
      <h1>Public Timeline</h1>
      {isAuthenticated && <p>Logged in as {userId}</p>}
    </div>
  );
}
