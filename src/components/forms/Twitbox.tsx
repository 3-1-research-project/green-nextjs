'use client';

import { useActionState, useEffect } from "react";
import { twit } from "@/actions/messages";
import { useRouter } from "next/navigation";

export default function Twitbox() {
    const [state, action, pending] = useActionState(twit, undefined);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            console.log("Message posted successfully");
        }
    }, [state, router]);

    return (
        <>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        <div className="twitbox">
            <h3>What&apos;s on your mind?</h3>
            <form action={action}>
                <input type="text" name="message" id="message" />
                <input disabled={pending} type="submit" value="Share"/>
            </form>
        </div></>
    )
}