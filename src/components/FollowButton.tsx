import { User } from "@/types/user.type";

export default function FollowButton({ user, loggedInUser }: { user: User, loggedInUser: User }) {
    if (user.user_id === loggedInUser.user_id) {
        return <div className="followstatus">This is you!</div>;
    }

    const followed = false;

    return (
        <div className="followstatus">
            {followed ? (
                <>
                    You are currently following this user.
                    <a className="unfollow" href={`/${user.username}/unfollow`}>Unfollow user</a>.
                </>
            ) : (
                <>
                    You are not yet following this user.
                    <a className="follow" href={`/${user.username}/follow`}>Follow user</a>.
                </>
            )}
        </div>
    );
}