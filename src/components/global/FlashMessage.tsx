'use client';

import { clearFlashMessages } from "@/lib/flash";
import { useEffect, useState } from "react";

export default function FlashMessages({ initialMessages }: { initialMessages: string[] }) {
    const [messages] = useState<string[]>(initialMessages);
    
    useEffect(() => {
        if (messages.length > 0) {
            clearFlashMessages();
        }
    }, [messages]);
    
    if (messages.length === 0) return null;

    return (
        <ul className="flashes">
            {messages.map((flashMessage) => (
                <li key={flashMessage + Math.random()}>{flashMessage}</li>
            ))}
        </ul>
    );
}