export default function FlashMessages({ messages }: { messages: string[] }) {
    return (
        <ul className="flashes">
            {messages.map((flashMessage) => (
                <li key={flashMessage + Math.random()}>{flashMessage}</li>
            ))}
        </ul>
    );
}