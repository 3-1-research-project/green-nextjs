import Twitbox from "@/components/forms/Twitbox";
import { Messages } from "@/components/messages/Messages";
import { getMessagesForPublicTimeline } from "@/lib/db/messages";
import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await verifySession()
  const user = session?.user;
  if (!user) {
    redirect("/public");
  }
  const messages = await getMessagesForPublicTimeline();
  
  return (
    <div>
      <h2>My Timeline</h2>
      <Twitbox />
      <Messages messages={messages} />
    </div>
  );
}
