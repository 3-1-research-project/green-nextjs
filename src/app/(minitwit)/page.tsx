"use client";

import { useAuthStore } from "@/lib/store/auth";

export default function PublicTimeline() {
  const { isAuthenticated, userId } = useAuthStore();
  return (
    <div>
      <h1>Public Timeline</h1>
      {isAuthenticated ? (
      <p>You are logged in as {userId}</p>
      ) : (
      <p>You are not logged in</p>
      )}
    </div>
  );
}
