"use server";

import { createMessage } from '@/lib/db/messages';
import { setFlashMessage } from '@/lib/flash';
import flashMessages from '@/lib/locale/messages';
import { verifySession } from '@/lib/session';
import { postTweetSchema } from '@/types/tweet.type';
import { revalidatePath } from 'next/cache';

interface MessageState {
    error?: string;
    success?: boolean;
}

export async function twit(prevState: MessageState | undefined, formData: FormData): Promise<MessageState> {
    const validatedFields = postTweetSchema.safeParse({
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.errors[0].message,
        };
    }

    const { message } = validatedFields.data;
    
    const {isAuth, user} = await verifySession();
    if (!isAuth) {
        return {error: "You must be logged in to post a message"};
    }
    
    await createMessage(message, user.user_id);

    await setFlashMessage(flashMessages.tweetSuccess);

    revalidatePath('/');
    return { success: true };
}