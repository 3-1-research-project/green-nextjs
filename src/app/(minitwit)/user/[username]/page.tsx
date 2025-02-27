import { Messages } from "@/components/MessageList";
import { getMessagesByUser } from "@/lib/db/messages";
import { getUserByUsername } from "@/lib/db/users";
import { verifySession } from "@/lib/session";
import FollowButton from "@/components/FollowButton";

export default async function UserPage({
    params,
  }: {
    params: Promise<{ username: string }>
  }) {
        const session = await verifySession()
        const loggedInUser = session?.user;
        if (loggedInUser) {
            
        }

        const username = (await params).username

        const profileUser = await getUserByUsername(username);
        const messages = await getMessagesByUser(profileUser.user_id);
        
        
        return (
            <div>
            <h2>{profileUser.username}&apos;s Timeline</h2>
            {loggedInUser.username === username && <FollowButton user={profileUser} loggedInUser={loggedInUser} />}
            <Messages messages={messages} />
            </div>
        );
  }