import { pool } from ".";
import { Tweet } from "@/types/tweet.type";

export async function getMessagesForPublicTimeline() : Promise<Tweet[]> {
    const client = await pool.connect();

    try {
        const { rows } = await client.query(
            `SELECT 
                m.message_id AS id, 
                m.text, 
                m.author_id, 
                u.username AS author_name, 
                u.email AS author_email,
                m.pub_date,
                m.flagged 
            FROM messages m
            JOIN users u ON m.author_id = u.user_id
            ORDER BY m.pub_date DESC 
            LIMIT 100`
        );
        return rows;
    } catch (error) {
        console.error("Error fetching messages");
        throw error;
    } finally {
        client.release();
    }
}

export async function createMessage(text: string, author_id: number) {
    const client = await pool.connect();
    
    try {
        await client.query(
            `INSERT INTO messages (text, author_id, pub_date, flagged) VALUES ($1, $2, $3, $4)`,
            [text, author_id, new Date(), 0]
        );
    } catch (error) {
        console.error("Error creating message");
        throw error;
    }
    finally {
        client.release();
    }
}

export async function getMessagesByUser(author_id: number) {
    const client = await pool.connect();

    try {
        const { rows } = await client.query(
            `SELECT 
                m.message_id AS id, 
                m.text, 
                m.author_id, 
                u.username AS author_name, 
                u.email AS author_email,
                m.pub_date,
                m.flagged 
            FROM messages m
            JOIN users u ON m.author_id = u.user_id
            WHERE m.author_id = $1
            ORDER BY m.pub_date DESC`,
            [author_id]
        );
        return rows;
    } catch (error) {
        console.error("Error fetching messages");
        throw error;
    } finally {
        client.release();
    }
}