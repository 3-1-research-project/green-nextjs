"use server";

import bcrypt from 'bcrypt';
import { createUser, getUserByUsername } from '@/lib/db/users';
import { LoginSchema, RegisterSchema } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { createSession, destroySession } from '@/lib/session';

interface AuthState {
    error?: string;
    success?: boolean;
    user?: User;
}

export async function register(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
    const validatedFields = RegisterSchema.safeParse({
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password2: formData.get('password2')
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.errors[0].message,
        };
    }

    const { username, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);

    return { success: true };
}

export async function login(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
    const validatedFields = LoginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return { error: "Invalid credentials" };
    }

    const { username, password } = validatedFields.data;
    const user = await getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.pw_hash))) {
        return { error: "Invalid credentials" };
    }

    await createSession(user.user_id);

    return { success: true, user: user };
}

export async function logout() {
    await destroySession();
}
