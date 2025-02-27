import { Messages } from "@/components/MessageList";
import { getMessagesForPublicTimeline } from "@/lib/db/messages";

export default async function PublicTimeline () {
    const messages = await getMessagesForPublicTimeline();
    return (
        <div>
        <h2>Public Timeline</h2>
        <p>Here you can see all public messages</p>
        <Messages messages={messages} />
        </div>
    )
}