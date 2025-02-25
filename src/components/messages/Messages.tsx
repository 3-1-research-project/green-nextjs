import { gravatarUrl } from "@/lib/util";
import { Tweet } from "@/types/tweet.type";
import Image from "next/image";
import Link from "next/link";


export function Messages({ messages }: { messages: Tweet[] }) {
    return (
        <ul className="messages">
      {messages.length > 0 ? (
        messages.map((message) => (
          <li key={message.id}>
             <Image
              src={gravatarUrl(message.author_email, 48)}
              alt={`${message.author_name}'s avatar`}
              width={48}
              height={48}
            />
            <p>
              <strong>
                <Link href={`/user/${message.author_name}`}>
                  {message.author_name}
                </Link>
              </strong>{" "}
              {message.text}
              <small>&mdash; {new Date(message.pub_date).toLocaleString()}</small>
            </p>
          </li>
        ))
      ) : (
        <li>
          <em>There&apos;s no message so far.</em>
        </li>
      )}
    </ul>
      
    );
  }