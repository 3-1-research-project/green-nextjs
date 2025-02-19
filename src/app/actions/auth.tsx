"use server";

import bcrypt from 'bcrypt';
import { createUser, getUserByUsername } from '@/lib/db';
import { LoginSchema, RegisterSchema } from '@/types/auth.type';
import { User } from '@/types/user.type';
import { createSession, destroySession } from '@/lib/session';

interface AuthState {
    error?: string;
    success?: boolean;
    user?: User;
}

export async function register(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
    const validation = RegisterSchema.safeParse({
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password2: formData.get('password2')
    });

    if (!validation.success) {
        return {
            error: validation.error.errors[0].message,
        };
    }

    const { username, email, password } = validation.data;

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return { error: "Username is already taken." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, email, hashedPassword);
        return { success: true };
    } catch (error) {
        console.error("User creation failed:", error);
        return { error: "Something went wrong. Please try again." };
    }
}

export async function login(prevState: AuthState | undefined, formData: FormData): Promise<AuthState> {
    const validation = LoginSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validation.success) {
        return { error: "Invalid credentials" };
    }

    const { username, password } = validation.data;

    try {
        const user = await getUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.pw_hash))) {
            return { error: "Invalid credentials" };
        }

        await createSession(user);
        return { success: true, user: user };
    } catch (error) {
        console.error("Login failed:", error);
        return { error: "Something went wrong. Please try again." };
    }

}

export async function logout() {
    await destroySession();
}
